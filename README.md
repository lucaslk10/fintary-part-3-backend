# Part 3 - Backend

## Description

This backend serves as the core of a simple matching system, featuring:

- A RESTful API for handling data operations
- Docker support for both development and production environments
- Comprehensive unit and integration tests
- API documentation via Swagger
- Code quality maintained with Prettier and ESLint
- Express.js framework for the server architecture
- Husky for enforcing code standards with pre-commit hooks

## Technology Stack

- **Node.js** with **Express.js** for the server framework
- **Docker** for containerization and easy deployment
- **Swagger** for API documentation
- **Jest** for unit and integration testing
- **Prettier** and **ESLint** for code formatting and linting
- **Husky** for pre-commit hooks to ensure code quality

## Getting Started

### Prerequisites

- Node.js and npm (for local development)
- Docker (for Docker-based setup)

### Running the Project

> **NOTE:** The server starts on port `3000` by default.

#### Local Development

To run the project locally:

```bash
npm install
npm run dev
```

#### Using Docker

For Docker users:

```bash
# Start the containers
make up

# Stop the containers
make down

# Build the container for production
make build

# Build the container for development
make build-dev

# Run the container
make run

# Pause the containers
make pause

# Clean up images
make clean

# Remove volumes
make remove
```

Use `make help` to see all available `make` commands.

## Documentation

Access the API documentation at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
