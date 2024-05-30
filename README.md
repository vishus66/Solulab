
# Todo Back-end Application
This repository contains a backend application for managing a todo list with user authentication. The backend is built using Node.js, Express.js, and MongoDB. Users can sign up or sign in to create, update, delete, and view their todo lists. The application supports authentication, pagination, and tagging for favorite todos.





## Features

 ## User Authentication
- Sign up and sign in using email and password.
- Authentication tokens are created using user credentials.

## Todo Management

- Create, update, delete, and view todos.
- View a particular todo created by the user.
- Search todos based on a search string.
## Pagination Support
- All APIs support pagination to manage large lists of todos.

## Database
- User information and todos are stored in MongoDB.
## API Endpoints

## Authentication

- Sign Up
    - URL: `/api/user`
    - Method: `POST`
    - Body: { "name": "name", "password": "password" ,username:"username",Phone:"Phone",email:"example@gmail.com" }#These are mandaitory fields and These fields are default empity or true #("address","pin","city","state","Role","active","pic")
    - Response: { "message": "created..." }
- login
    - URL: /api/user/login
    - Method: POST
    - Body: { "email": "user@example.com", "password": "password" }
    - Response: { "token": "your-jwt-token" }

## Todos

- Create Todo

    - URL: /api/todos
    - Method: POST
    - Headers: { "Authorization": "Bearer your-jwt-token" }
    - Body: { "title": "New Todo", "description": "Todo description","status":"Pending" }#"createdAt","updatedAt" these are by default
    - Response: { "message": "Todo created successfully", "todo": { ... } }
Update Todo

- URL: /api/todos/:id
    - Method: PUT
    - Headers: { "Authorization": "Bearer your-jwt-token" }
    - Body: { "title": "Updated Title", "description": "Updated description","status":"updated Status" }
    - Response: { "message": "Todo updated successfully", "todo": { ... } }
- Delete Todo

    - URL: /api/todos/:id
    - Method: DELETE
    - Headers: { "Authorization": "Bearer your-jwt-token" }
    - Response: { "message": "Todo deleted successfully" }
- Get Todo List

    - URL: /api/todos
    - Method: GET
    - Headers: { "Authorization": "Bearer your-jwt-token" }
    - Response: { "todos": [ ... ], "pagination": { "page": 1, "limit": 10, "totalPages": x } }
- Get Single Todo

    - URL: /api/todos/:id
    - Method: GET
    - Headers: { "Authorization": "Bearer your-jwt-token" }
    - Response: { "todo": { ... } }
- Search Todos

    - URL: /api/todos/search
    - Method: GET
    - Headers: { "Authorization": "Bearer your-jwt-token" }
    - Query Params: q=search-string&page=1&limit=10
    - Response: { "todos": [ ... ], "pagination": { "page": 1, "limit": 10, "totalPages": x } }

## Project Structure
todo-backend/
├── controllers/       # Controller functions for handling requests
├── models/             # Mongoose models
├── routes/             # Route definitions
├── middleware/         # Custom middleware (e.g., authentication,      multer)
├── .env                # Environment variables
└── index.js           # Server entry point
