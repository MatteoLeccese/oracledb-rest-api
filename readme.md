# OracleDB REST API

A Node.js REST API for querying and managing worker data stored in an Oracle database. The API exposes endpoints to retrieve all workers, their total salary, and annual salaries, using PL/SQL packages for efficient database access.

## Features

- Get all workers with department info
- Get total salary of all workers
- Get annual salaries for all workers
- Oracle migrations for schema and PL/SQL package
- Environment-based configuration

## Setup

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment
Copy .env.example to .env and fill in your Oracle DB credentials:

### 3. Run database migrations
This will create tables and PL/SQL package in your Oracle DB.

```sh
npm run build
node dist/run-migrations.js
```

### 4. Start the API server

```sh
npm run build
npm start
```

The API should be available at http://localhost:8080/api. (Or the port you choose on the .env file)

## API Endpoints

You can see the entire documentation using postman by importing this file
[Postman Docs](documentation/oracle-node.postman_collection.json)


## Run on Development mode
For development you first need to run the migrations:

```sh
npm run build
node dist/run-migrations.js
```

Once the migrations are done you can run on development

```sh
npm run dev
```

## Test the application
To test the application you can run the following command:

```sh
npm run test
```
