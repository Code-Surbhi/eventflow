# Week 1, Day 1 - Project Setup & First Lambda Deployment

**Date:** 2026-02-27

## 🎯 What I Accomplished Today

### Environment Setup

- [x] Installed VS Code with essential extensions
- [x] Installed Node.js, Git, AWS CLI, SAM CLI, Docker
- [x] Created AWS account with billing alerts
- [x] Created IAM user (eventflow-developer)
- [x] Configured AWS CLI credentials

### Project Setup

- [x] Created GitHub repository
- [x] Set up professional folder structure
- [x] Created README, CONTRIBUTING, templates
- [x] First commit and push to GitHub

### Phase 1: Event Ingestion

- [x] Created SAM template (template.yaml)
- [x] Built Lambda function with validation
- [x] Tested locally with SAM CLI
- [x] Deployed to AWS successfully!
- [x] Verified live endpoints working

## 💡 What I Learned

### Lambda Concepts

- **Handler Function:** `exports.handler = async (event, context) => {}`
- **Event Object:** Contains HTTP request data from API Gateway
- **Context Object:** Contains requestId, function info, remaining time
- **Cold Start:** First invocation is slower (container initialization)

### SAM/CloudFormation

- SAM templates are transformed into CloudFormation
- `AWS::Serverless::Function` creates Lambda + IAM Role automatically
- `Type: Api` events create API Gateway automatically
- `!Sub` substitutes variables into strings
- `!Ref` references parameters or resources

### API Gateway

- Proxy integration passes entire HTTP request to Lambda
- Response must include: statusCode, headers, body (as string)
- CORS headers needed for browser access

### Troubleshooting I Did

1. **CORS Error:** Removed Globals Cors config, let SAM handle it
2. **Architecture Issue:** Changed arm64 to x86_64 for Windows Docker
3. **CloudWatch Role Error:** Simplified template, removed API access logging

## 🔗 DVA-C02 Exam Connections

| Topic              | What I Learned                       | Exam Relevance |
| ------------------ | ------------------------------------ | -------------- |
| Lambda             | Handler, event, context, cold starts | ~25% of exam   |
| API Gateway        | Proxy integration, stages            | ~15% of exam   |
| SAM/CloudFormation | IaC, transforms, intrinsic functions | ~15% of exam   |
| IAM                | Execution roles, least privilege     | ~15% of exam   |
| CloudWatch         | Automatic Lambda logging             | ~10% of exam   |

## 📊 Resources Created

| Resource    | Name                                | Purpose                 |
| ----------- | ----------------------------------- | ----------------------- |
| Lambda      | eventflow-ingestion-dev             | Process incoming events |
| API Gateway | ServerlessRestApi                   | HTTP endpoints          |
| Log Group   | /aws/lambda/eventflow-ingestion-dev | Function logs           |
| IAM Role    | EventIngestionFunctionRole          | Lambda permissions      |

## 🔗 My Live API

```
Health: https://[MY-API-ID].execute-api.us-east-1.amazonaws.com/Prod/health
Events: https://[MY-API-ID].execute-api.us-east-1.amazonaws.com/Prod/events
```

## 📺 YouTube Video Ideas

1. "I Deployed My First Lambda Function in Under an Hour"
2. "SAM vs CloudFormation: What Beginners Need to Know"
3. "3 Errors Every Beginner Makes with SAM (And How to Fix Them)"

## ✅ Tomorrow's Goals (Phase 2)

- [ ] Add SQS queue for reliable message processing
- [ ] Create Dead Letter Queue for failed events
- [ ] Build processor Lambda
- [ ] Implement retry logic

## 🎉 Wins Today

1. Went from not knowing VS Code to deploying on AWS!
2. Fixed 3 deployment errors on my own (with guidance)
3. Have a LIVE API anyone can call!
4. Understood Lambda cold starts and event structure
