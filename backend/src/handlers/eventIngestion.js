/**
 * EventFlow - Event Ingestion Lambda Function
 *
 * This is the entry point for all events coming into EventFlow.
 * It receives events via API Gateway, validates them, and prepares
 * them for processing.
 *
 * DVA-C02 Concepts Demonstrated:
 * - Lambda handler structure (event, context)
 * - API Gateway proxy integration
 * - Structured logging for CloudWatch
 * - Error handling patterns
 * - Cold starts and initialization
 *
 * @author Your Name
 * @version 1.0.0
 */

// ============================================================================
// COLD START vs WARM START
// ============================================================================
// Code here runs ONCE when the container starts (cold start)
// This is called "initialization code"
// Subsequent invocations reuse this container (warm start) and skip this

const FUNCTION_NAME = process.env.FUNCTION_NAME || "EventIngestion";
const STAGE = process.env.STAGE || "dev";

// Track cold starts for observability
let isFirstInvocation = true;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a unique event ID
 * Using timestamp + random string for simplicity (uuid package would be better)
 */
const generateEventId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `evt_${timestamp}_${randomPart}`;
};

/**
 * Get current timestamp in ISO format
 */
const getTimestamp = () => new Date().toISOString();

/**
 * Structured logging - outputs JSON that CloudWatch can parse
 * This makes logs searchable with CloudWatch Insights!
 *
 * DVA-C02: Know that structured logging improves observability
 */
const log = (level, message, data = {}) => {
  const logEntry = {
    timestamp: getTimestamp(),
    level,
    function: FUNCTION_NAME,
    stage: STAGE,
    message,
    ...data,
  };

  // CloudWatch captures console.log output
  console.log(JSON.stringify(logEntry));
};

/**
 * Validate the incoming event payload
 * Returns { valid: boolean, errors: string[] }
 */
const validateEvent = (payload) => {
  const errors = [];

  // Check required fields
  if (!payload) {
    errors.push("Request body is required");
    return { valid: false, errors };
  }

  // Event type is required
  if (!payload.eventType) {
    errors.push("eventType is required");
  } else if (typeof payload.eventType !== "string") {
    errors.push("eventType must be a string");
  } else if (payload.eventType.length < 1 || payload.eventType.length > 100) {
    errors.push("eventType must be between 1 and 100 characters");
  }

  // Source is required
  if (!payload.source) {
    errors.push("source is required");
  } else if (typeof payload.source !== "string") {
    errors.push("source must be a string");
  }

  // Data is optional but must be an object if provided
  if (payload.data !== undefined && typeof payload.data !== "object") {
    errors.push("data must be an object");
  }

  // Priority is optional but must be valid if provided
  const validPriorities = ["low", "normal", "high", "critical"];
  if (payload.priority && !validPriorities.includes(payload.priority)) {
    errors.push(`priority must be one of: ${validPriorities.join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Build a standardized API response
 *
 * DVA-C02: API Gateway expects this exact response format for proxy integration!
 * The response MUST have statusCode, headers, and body (stringified JSON)
 */
const buildResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      // CORS headers - allow browsers to call this API
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      // Security headers
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
    body: JSON.stringify(body),
  };
};

// ============================================================================
// MAIN HANDLER
// ============================================================================

/**
 * Lambda Handler Function
 *
 * This is the function that AWS Lambda invokes.
 *
 * @param {Object} event - The event from API Gateway (contains HTTP request info)
 * @param {Object} context - Lambda runtime information (requestId, timeout, etc.)
 * @returns {Object} - Response object for API Gateway
 *
 * DVA-C02 Key Points:
 * - 'event' contains: body, headers, httpMethod, path, queryStringParameters, etc.
 * - 'context' contains: awsRequestId, functionName, memoryLimitInMB, getRemainingTimeInMillis()
 * - Response must match API Gateway proxy integration format
 */
exports.handler = async (event, context) => {
  // Track execution time
  const startTime = Date.now();

  // Log cold start status (important for performance monitoring!)
  const coldStart = isFirstInvocation;
  isFirstInvocation = false;

  log("INFO", "Received request", {
    requestId: context.awsRequestId,
    httpMethod: event.httpMethod,
    path: event.path,
    coldStart,
    remainingTime: context.getRemainingTimeInMillis(),
  });

  try {
    // ========================================================================
    // HEALTH CHECK ENDPOINT
    // ========================================================================
    if (event.path === "/health" && event.httpMethod === "GET") {
      log("INFO", "Health check requested");

      return buildResponse(200, {
        status: "healthy",
        service: "EventFlow",
        version: "1.0.0",
        timestamp: getTimestamp(),
        stage: STAGE,
        coldStart,
        region: process.env.AWS_REGION,
      });
    }

    // ========================================================================
    // EVENT INGESTION ENDPOINT
    // ========================================================================
    if (event.path === "/events" && event.httpMethod === "POST") {
      // Parse the request body
      // API Gateway sends body as a string, so we need to parse it
      let payload;

      try {
        payload = event.body ? JSON.parse(event.body) : null;
      } catch (parseError) {
        log("WARN", "Invalid JSON in request body", {
          error: parseError.message,
          requestId: context.awsRequestId,
        });

        return buildResponse(400, {
          success: false,
          error: "Invalid JSON in request body",
          code: "INVALID_JSON",
        });
      }

      // Validate the event payload
      const validation = validateEvent(payload);

      if (!validation.valid) {
        log("WARN", "Event validation failed", {
          errors: validation.errors,
          requestId: context.awsRequestId,
        });

        return buildResponse(400, {
          success: false,
          error: "Validation failed",
          code: "VALIDATION_ERROR",
          details: validation.errors,
        });
      }

      // Create the enriched event
      // We add metadata that will be useful for processing
      const enrichedEvent = {
        // System-generated fields
        eventId: generateEventId(),
        receivedAt: getTimestamp(),
        ingestionRequestId: context.awsRequestId,

        // User-provided fields
        eventType: payload.eventType,
        source: payload.source,
        priority: payload.priority || "normal",
        data: payload.data || {},

        // Metadata
        metadata: {
          stage: STAGE,
          functionVersion: context.functionVersion,
          coldStart,
          processingTimeMs: Date.now() - startTime,
        },
      };

      log("INFO", "Event processed successfully", {
        eventId: enrichedEvent.eventId,
        eventType: enrichedEvent.eventType,
        source: enrichedEvent.source,
        priority: enrichedEvent.priority,
        processingTimeMs: enrichedEvent.metadata.processingTimeMs,
      });

      // For now, just return the event
      // In Phase 2, we'll send this to SQS for further processing!
      return buildResponse(202, {
        success: true,
        message: "Event accepted for processing",
        eventId: enrichedEvent.eventId,
        receivedAt: enrichedEvent.receivedAt,
      });
    }

    // ========================================================================
    // UNKNOWN ENDPOINT
    // ========================================================================
    log("WARN", "Unknown endpoint requested", {
      path: event.path,
      method: event.httpMethod,
    });

    return buildResponse(404, {
      success: false,
      error: "Endpoint not found",
      code: "NOT_FOUND",
      path: event.path,
    });
  } catch (error) {
    // ========================================================================
    // ERROR HANDLING
    // ========================================================================
    // Always catch unexpected errors and return a proper response
    // Never let Lambda return a raw error (bad UX and security risk)

    log("ERROR", "Unexpected error occurred", {
      error: error.message,
      stack: error.stack,
      requestId: context.awsRequestId,
    });

    return buildResponse(500, {
      success: false,
      error: "Internal server error",
      code: "INTERNAL_ERROR",
      requestId: context.awsRequestId,
    });
  }
};
