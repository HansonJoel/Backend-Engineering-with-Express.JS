# 🚀 Express Middleware Tutorial

This project demonstrates how to use **middleware** in an Express.js application.  
It includes examples of global middleware, route-specific middleware, and custom middleware for request validation.

---

## 📌 Features

- **Express.js server** with CRUD operations on a mock user database (in-memory array).

## 🧩 Middleware Used

### 🌍 Global Middleware

- **`express.json()`** → Parses incoming JSON request bodies.
- **`loggingMiddleware`** → Logs the HTTP method and URL of incoming requests.

### ⚡ Custom Middleware

- **`resolveIndexByUserId`** → Validates the `id` in request params and ensures the user exists before proceeding.

- **RESTful Endpoints**
  - `GET /` → Home page with middleware logging.
  - `GET /api/users` → Retrieve all users.
  - `GET /api/users/:id` → Retrieve a user by ID.
  - `PUT /api/users/:id` → Fully update a user.
  - `PATCH /api/users/:id` → Partially update a user.
  - `DELETE /api/users/:id` → Delete a user by ID.
- **In-Memory Mock Database** (no external DB required).

---

## 🛠️ Technologies Used

- [Express.js](https://expressjs.com/) - Web framework for Node.js
- Node.js - Runtime environment
- Middleware - Custom and built-in (`express.json()`)

---


## 📖 Learning Notes

- Middleware can be applied **globally** or to **specific routes**.  
- Middleware can **modify `req` and `res` objects** and pass information along to route handlers.  
- Helps in creating **reusable validation logic** (like checking user IDs).  
