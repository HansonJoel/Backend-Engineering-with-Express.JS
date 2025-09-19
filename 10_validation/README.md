# User Management API (Express + Validation)

This project is a simple **User Management API** built with **Express.js** and **express-validator**.  
It demonstrates how to implement **CRUD operations** with proper **validation middleware**.

---

## 🚀 Features

- **GET** `/api/users` → Fetch all users (with optional query validation).
- **GET** `/api/users/:id` → Fetch a single user by ID.
- **POST** `/api/users` → Create a new user with validation.
- **PUT** `/api/users/:id` → Replace a user by ID.
- **PATCH** `/api/users/:id` → Partially update a user.
- **DELETE** `/api/users/:id` → Delete a user by ID.

---

## 📂 Project Structure

10_validation/
│── index.mjs # Main server file
│── utils/
│ └── validationSchema.mjs # Validation schema for user creation

## 🎯 What I Learned

- How to use **express-validator** for input validation.
- How to structure **validation schemas**.
- How to handle **CRUD routes** in Express.
- How to implement **middleware** for reusable logic.
