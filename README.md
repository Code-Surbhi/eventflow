<div align="center">

# ⚡ EventFlow

### Serverless Event Processing Pipeline

_A production-grade, real-time event processing system built entirely on AWS Free Tier_

[![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Lambda](https://img.shields.io/badge/Lambda-Event_Driven-FF9900?style=for-the-badge&logo=aws-lambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-NoSQL-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)](https://aws.amazon.com/dynamodb/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

[Live Demo](https://1bzlogu986.execute-api.us-east-1.amazonaws.com/Prod) · [Documentation](docs/) · [YouTube Series](https://youtube.com/@yourchannel)

<br />

<img src="docs/architecture/diagrams/eventflow-hero.png" alt="EventFlow Architecture" width="800"/>

</div>

---

## 🌟 What is EventFlow?

EventFlow is a **serverless event processing pipeline** that demonstrates production-grade AWS architecture patterns. Built as a learning project for the AWS Developer Associate (DVA-C02) certification, it showcases:

- **Real-time event ingestion** via API Gateway
- **Reliable message queuing** with SQS and Dead Letter Queues
- **Serverless processing** using Lambda functions
- **Event-driven architecture** with EventBridge
- **NoSQL data storage** in DynamoDB with Streams
- **Comprehensive observability** using X-Ray and CloudWatch

> 💡 **The twist?** The entire infrastructure runs on **AWS Free Tier** — $0/month!

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🚀 Backend

- RESTful API with request validation
- Priority-based message processing
- Automatic retry with exponential backoff
- Dead Letter Queue recovery system
- Real-time event aggregation
- S3 archival for compliance

</td>
<td width="50%">

### 🎨 Frontend

- Real-time event flow visualization
- Live metrics dashboard
- Terminal-style event logs
- Dark mode by default
- Micro-interactions & animations
- Fully responsive design

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
                                    ┌─────────────────┐
                                    │   CloudWatch    │
                                    │    Metrics      │
                                    └────────▲────────┘
                                             │
┌──────────┐    ┌─────────────┐    ┌────────┴────────┐    ┌─────────────┐
│  Client  │──▶│ API Gateway │───▶│     Lambda      │──▶│     SQS     │
└──────────┘    └─────────────┘    │   (Ingestion)   │    │    Queue    │
                                   └─────────────────┘    └──────┬──────┘
                                                                  │
                    ┌─────────────────────────────────────────────┼─────┐
                    │                                             │     │
                    ▼                                             ▼     │
          ┌─────────────────┐                           ┌─────────────┐ │
          │   EventBridge   │                           │   Lambda    │ │
          │     (Router)    │                           │ (Processor) │ │
          └────────┬────────┘                           └──────┬──────┘ │
                   │                                           │        │
       ┌───────────┼───────────┐                               │        │
       ▼           ▼           ▼                               ▼        │
┌───────────┐ ┌─────────┐ ┌─────────┐                   ┌───────────┐   │
│    SNS    │ │   S3    │ │ Lambda  │                   │ DynamoDB  │   │
│  (Alerts) │ │(Archive)│ │(Custom) │                   │  (Store)  │   │
└───────────┘ └─────────┘ └─────────┘                   └─────┬─────┘   │
                                                               │        │
                                                               ▼        │
                                                        ┌───────────┐   │
                                                        │  Lambda   │   │
                                                        │(Aggregator│   │
                                                        └───────────┘   │
                                                                        │
                                             ┌──────────────────────────┘
                                             │ (on failure)
                                             ▼
                                   ┌─────────────────┐
                                   │  Dead Letter    │
                                   │     Queue       │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │     Lambda      │
                                   │  (DLQ Recovery) │
                                   └─────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or later
- AWS CLI v2
- SAM CLI
- Docker Desktop
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/eventflow.git
cd eventflow

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Deploy to AWS (from backend folder)
cd ../backend
sam build
sam deploy --guided
```

### Live API Endpoints

```
Health Check: https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/Prod/health
Submit Event: https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/Prod/events
```

### Test the API

```bash
# Health check
curl https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/Prod/health

# Submit an event
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/Prod/events \
  -H "Content-Type: application/json" \
  -d '{"eventType":"test","source":"readme","priority":"normal"}'
```

### Local Development

```bash
# Start the backend locally
cd backend
sam local start-api

# Start the frontend (in another terminal)
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
eventflow/
├── 📂 .github/           # GitHub Actions & templates
├── 📂 backend/           # Serverless backend (SAM)
│   ├── 📂 src/
│   │   ├── 📂 handlers/  # Lambda functions
│   │   ├── 📂 utils/     # Shared utilities
│   │   └── 📂 config/    # Configuration
│   ├── 📂 tests/         # Unit & integration tests
│   └── 📄 template.yaml  # SAM/CloudFormation template
├── 📂 frontend/          # React dashboard
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   ├── 📂 hooks/
│   │   └── 📂 styles/
│   └── 📂 public/
├── 📂 docs/              # Documentation
│   ├── 📂 architecture/
│   ├── 📂 setup/
│   └── 📂 learning-journal/
└── 📂 scripts/           # Utility scripts
```

---

## 🎓 DVA-C02 Concepts Demonstrated

This project covers **~70% of the AWS Developer Associate exam domains**:

| Domain              | Concepts Covered                                        |
| ------------------- | ------------------------------------------------------- |
| **Development**     | Lambda, API Gateway, SDK usage, environment variables   |
| **Security**        | IAM roles/policies, least privilege, secrets management |
| **Deployment**      | SAM, CloudFormation, CI/CD with GitHub Actions          |
| **Troubleshooting** | X-Ray tracing, CloudWatch Logs/Metrics, debugging       |

---

## 📊 Free Tier Usage

| Service     | Free Tier Limit | Our Usage | Status  |
| ----------- | --------------- | --------- | ------- |
| Lambda      | 1M requests/mo  | ~10K      | ✅ Safe |
| API Gateway | 1M calls/mo     | ~10K      | ✅ Safe |
| DynamoDB    | 25 GB storage   | ~100 MB   | ✅ Safe |
| SQS         | 1M requests/mo  | ~20K      | ✅ Safe |
| S3          | 5 GB storage    | ~500 MB   | ✅ Safe |
| CloudWatch  | 10 metrics      | 5         | ✅ Safe |

---

## 🛠️ Built With

**Backend:**

- AWS Lambda (Node.js 20.x)
- Amazon API Gateway
- Amazon SQS
- Amazon DynamoDB
- Amazon EventBridge
- Amazon SNS
- Amazon S3
- AWS X-Ray
- AWS SAM

**Frontend:**

- React 18
- Vite
- Tailwind CSS (heavily customized)
- Framer Motion
- Recharts
- React Query

**DevOps:**

- GitHub Actions
- AWS SAM CLI
- Docker

---

## 📺 YouTube Series

Follow along with the build process on my YouTube channel:

1. [Setting Up Your AWS Dev Environment](https://youtube.com/watch?v=xxx)
2. [Building the Event Ingestion API](https://youtube.com/watch?v=xxx)
3. [Implementing SQS Message Queuing](https://youtube.com/watch?v=xxx)
4. _... more coming soon!_

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- AWS Documentation and Tutorials
- The serverless community
- Everyone who watches my YouTube videos!

---

<div align="center">

**Built with ❤️ and ☕ by [Surbhi Singh](https://github.com/Code-Surbhi)**

_Currently preparing for AWS DVA-C02 certification_

⭐ Star this repo if you found it helpful!

</div>
