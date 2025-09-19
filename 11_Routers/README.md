# 🚀 Express Routers Tutorial

This project (`11_Routers`) is part of my Express.js learning journey.  
In this tutorial, I learned how to **use routers in Express** to structure APIs in a modular way.

---

## 📂 Project Structure

11_Routers/
│── index.mjs # Entry point of the app
│── src/
│ ├── routes/
│ │ ├── products.mjs # Product routes
│ │ └── users.mjs # User routes (CRUD operations)
│ │
│ └── utils/
│ ├── db.mjs # Mock database (in-memory)
│ ├── middlewares.mjs # Custom middleware
│ └── validationSchema.mjs # Validation rules

## 📚 What I Learned

- How to **separate routes** into different files using `express.Router()`.
- How to organize project files into **routes** and **utils** folders.
- How to use **middleware** to handle repeated logic (e.g., checking if a user exists).
- How to apply **validation schemas** using `express-validator`.
- How to create RESTful APIs with CRUD operations (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).

---

## 🛠️ Available Routes

### Users

- `GET /api/users` → Get all users
- `GET /api/users/:id` → Get user by ID
- `POST /api/users` → Create new user (with validation)
- `PUT /api/users/:id` → Update user (full replace)
- `PATCH /api/users/:id` → Partially update user
- `DELETE /api/users/:id` → Delete user by ID

### Products

- `GET /api/products` → Get product list

## ✨ Key Takeaway

Using **routers** in Express helps break down large applications into **modular, maintainable files**.  
This makes the project **easier to scale and debug**.
