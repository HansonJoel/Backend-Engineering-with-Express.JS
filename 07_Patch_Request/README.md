# 🚀 Express.js PATCH Request Tutorial

This project is a simple **Express.js server** that demonstrates how to handle **GET** and **PATCH** requests using an in-memory database (array of users).

It was built as part of my learning journey to understand how APIs support **partial updates** with the `PATCH` method.

---

## 📌 Features

- ✅ Setup of an Express server
- ✅ Middleware for parsing JSON request bodies (`express.json()`)
- ✅ `GET /api/users` → Retrieve all users
- ✅ `PATCH /api/users/:id` → Update part of a user’s record by ID
- ✅ Error handling for invalid or missing IDs
- ✅ In-memory database for quick testing

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

---

# 🎯 Learning Goal

The goal of this project was to practice:

- Creating **GET** and **PATCH** routes in **Express.js**
- Using **middleware** (`express.json()`) for parsing request bodies
- Handling **errors** for invalid or missing users
- Updating in-memory data with the **spread operator** for partial updates
