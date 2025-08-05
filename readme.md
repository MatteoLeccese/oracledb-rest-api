# OracleDB REST API

A Node.js REST API for querying and managing worker data stored in an Oracle database. The API exposes endpoints to retrieve all workers, their total salary, and annual salaries, using PL/SQL packages for efficient database access.

## Features

- Get all workers with department info
- Get total salary of all workers
- Get annual salaries for all workers
- Oracle migrations for schema and PL/SQL package
- Environment-based configuration

## Prerequisites
Before installing and running this project, make sure you have the following installed on your system:

- **Node.js** (recommended version: 18.x or higher)
- **npm** (comes with Node.js)
- **Oracle Database** (you can use Oracle Database Express Edition for development)
- **Valid access and credentials** to connect to your Oracle database
- **Oracle Instant Client** installed (if your environment requires it for node-oracledb)

**Note:** If you are using Windows, make sure to set the necessary environment variables for Oracle Instant Client.

Once you have these prerequisites, follow the installation and setup steps described below.

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

## Contact

If you have any questions, suggestions, or need support, feel free to contact me:

[![Email me](https://img.shields.io/badge/Email-matteoleccese2099@gmail.com-blue?style=for-the-badge&logo=gmail)](mailto:matteoleccese2099@gmail.com)
