/**
 * EventFlow - Shared Constants
 *
 * Central location for all configuration values.
 * This makes it easy to change settings without hunting through code.
 */

// Valid event priorities
const PRIORITIES = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
  CRITICAL: "critical",
};

// All valid priority values as an array
const VALID_PRIORITIES = Object.values(PRIORITIES);

// HTTP Status Codes (for clarity in code)
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error codes for API responses
const ERROR_CODES = {
  INVALID_JSON: "INVALID_JSON",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
};

// Limits
const LIMITS = {
  MAX_EVENT_TYPE_LENGTH: 100,
  MAX_SOURCE_LENGTH: 100,
  MAX_DATA_SIZE_KB: 256, // 256KB max payload
};

module.exports = {
  PRIORITIES,
  VALID_PRIORITIES,
  HTTP_STATUS,
  ERROR_CODES,
  LIMITS,
};
