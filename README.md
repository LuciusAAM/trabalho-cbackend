# Express + MongoDB REST API (Users)

## Overview
API sample implementing CRUD operations for a `User` resource using Express, MongoDB (Mongoose), JWT authentication, input validation and tests.

## Features
- RESTful endpoints versioned at `/api/v1`
- JWT-based authentication (protects write routes)
- Input validation with `express-validator`
- Swagger (OpenAPI) documentation available at `/api-docs`
- Unit/integration tests using Jest + Supertest

## Setup
1. Clone the repository.
2. Copy `.env.example` to `.env` and fill values.
3. `npm install`
4. `npm run dev` to start in dev mode.

## Run tests
`npm test`

## Endpoints (summary)
- `POST /api/v1/users/register` — register
- `POST /api/v1/users/login` — login (receive JWT)
- `GET /api/v1/users` — list users
- `GET /api/v1/users/:id` — get user
- `PUT /api/v1/users/:id` — update user (requires JWT)
- `DELETE /api/v1/users/:id` — delete user (requires JWT)

## Group/Authors
- Aluno A — setup + models
- Aluno B — controllers + auth
- Aluno C — tests + docs

## Issues (example backlog)
1. Implement pagination for GET /users
2. Add role-based authorization
3. Add rate limiter
4. Improve test coverage for error cases
