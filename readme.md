<div align="center">
  <img src="https://poloandtweed.com/wp-content/uploads/2019/07/Tips-to-Managing-Tasks.jpg" width="600" height="400"/>
</div>

# Task Manager API Using MongoDB, mongoose, and Node.js

This was created during my time as a student at Code Chrysalis

## Features

- Authentication
- Task lists
- Filtering and sorting
- Basic frontend access

## Installation

Use npm to install all dependencies

### Database Setup

Connect to the database through

```bash
/Users/path/to/mongodb/bin/mongod.exe --dbpath=path/to/data/mongodb-data
```

Seeding the database with sample data is supposed to done by either running (simple test data without JWT)

```bash
npm run sSeed
```

or running (more complex test data with JWT)

```bash
npm run cSeed
```

### Starting the server

Run the following command to connect to the database and run the express server.

```bash
 npm run dev
```

**Please note:** Some scripts defined in package.json require the usage of the npm env-cmd package, which is set up to expect environment variables in the following path:

```bash
 ./config/dev.env
```

Currently this includes the following variables:

- PORT - the port to access the server
- MONGODB_URL - the URL to your DB
- JWT_SECRET - the secret used for JWT generation

## Endpoints

### User Related Endpoints

- GET /users/me
- POST /users
- POST /users/login
- POST /users/logout
- POST /users/logout-all
- PATCH /users/me
- DELETE /users/me

### Task Related Endpoints

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

## Tests

Not yet implemented

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
