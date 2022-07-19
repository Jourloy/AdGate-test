<h1 align="center">
  AdGate test case
</h1>

## Description

Backend on NestJS. Database is PostgresSQL. Need an authorization and registration. Also, 
need roles for users: *Client* and *Administrator*.

Mane fields for user:
- email
- password
- role

Each 5 seconds need to parse a list of data by url.

Need a route for administrator for activate or stop parsing.

Need a Socket.io server with event *parsing*. If client subscribe, then server should return
parsed or empty array.

## Installation

```bash
$ yarn install
```

## ENV

You should create `.env` file before start. Look into `.env.template`

## Database

```bash
# Generate ormconfig for typeorm
$ yarn ormconfig:generate

# Run generated migration
$ yarn migration:run
```

## Running the app

### Docker

```bash
$ docker-compose up -d
```

### NPM

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Endpoints

Open `http://localhost:3000/swagger` for get swagger API doc

###### 3000 is your app port

Also, you can open `AdGate.postman_collection.json` in postman