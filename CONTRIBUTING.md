# Contributing to EventFlow

First off, thank you for considering contributing to EventFlow! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Be kind, respectful, and constructive. We're all here to learn!

## How Can I Contribute?

### 🐛 Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/YOUR-USERNAME/eventflow/issues)
2. If not, create a new issue using the Bug Report template
3. Include as much detail as possible

### 💡 Suggesting Features

1. Check existing [Issues](https://github.com/YOUR-USERNAME/eventflow/issues) for similar suggestions
2. Create a new issue using the Feature Request template
3. Explain the use case and benefits

### 🔧 Contributing Code

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/eventflow.git
cd eventflow

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run locally
cd ../backend
sam local start-api
```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Type        | Description                |
| ----------- | -------------------------- |
| `feat:`     | New feature                |
| `fix:`      | Bug fix                    |
| `docs:`     | Documentation only         |
| `style:`    | Formatting, no code change |
| `refactor:` | Code restructuring         |
| `test:`     | Adding tests               |
| `chore:`    | Maintenance tasks          |

**Examples:**

```
feat: add event validation for priority field
fix: resolve DLQ message parsing error
docs: update README with new architecture diagram
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

---

Thank you for contributing! 🚀
