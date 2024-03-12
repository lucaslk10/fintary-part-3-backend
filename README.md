# Part 3 - Backend

## Description
This project includes

- A RESTful API to manage the data of a simple matching system
- Dockerized environment for development and production
- Unit tests
- Integration tests
- Swagger documentation
- Prettier/Eslint
- Express for the server
- Husky for pre-commit hooks


## Running the project
>NOTE: By default server will be started at port 3000.

### Local
To run the project locally, you need to have Node.js and npm installed. Then, you can run the following commands:

```bash
npm install
npm run dev
```

### Docker

To run the project using Docker, you need to have Docker installed. Then, you can run the following commands:

```bash
## Up the container images
make up

## Down the container images
make down

## Build the container image - Production
make build

## Build the container image - Development
make build-dev

## Run the container image
make run

## Pause the containers
make pause

## Clean the images
make clean

## Remove the volumes
make remove
```

You can also use ```make help``` to check the list of available commands in the makefile.

## Dcoumentation
The API documentation is available at http://localhost:3000/api-docs