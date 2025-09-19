// ----------------------------------------------
// Import dependencies
// ----------------------------------------------
import express from "express";
import {
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";

import { createUserValidationSchema } from "./utils/validationSchema.mjs";

// ----------------------------------------------
// Server Configurations
// ----------------------------------------------
const PORT = process.env.PORT || 3000;
const HOSTNAME = "localhost";

// ----------------------------------------------
// Mock Database (in-memory)
// ----------------------------------------------
const mockUsers = [
  { id: 1, username: "John", displayName: "John" },
  { id: 2, username: "Jack", displayName: "Jack" },
  { id: 3, username: "Adam", displayName: "Adam" },
  { id: 4, username: "Jason", displayName: "Jason" },
  { id: 5, username: "Henry", displayName: "Henry" },
  { id: 6, username: "Mary", displayName: "Mary" },
  { id: 7, username: "Marilyn", displayName: "Marilyn" },
];

// ----------------------------------------------
// Initialize Express Application
// ----------------------------------------------
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// ----------------------------------------------
// Middleware: Resolve User Index by ID
// ----------------------------------------------
const resolveIndexByUserId = (req, res, next) => {
  const id = req.params.id;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return res.status(400).json({ error: `${id} is not a valid UserID` });
  }

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) {
    return res.status(404).json({ error: `No user found with ID ${id}` });
  }

  req.findUserIndex = findUserIndex;
  next();
};

// ----------------------------------------------
// GET: Retrieve all users
// ----------------------------------------------
app.get(
  "/api/users",
  query("filter")
    .optional() // make filter optional
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Filter must be a string between 3–10 characters"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json(mockUsers);
  }
);

// ----------------------------------------------
// GET: Retrieve user by ID
// ----------------------------------------------
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const user = mockUsers[req.findUserIndex];
  res.status(200).json(user);
});

// ----------------------------------------------
// POST: Create a new user with validation
// ----------------------------------------------
app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...data,
  };

  mockUsers.push(newUser);
  res.status(201).json(newUser);
});

// ----------------------------------------------
// PUT: Replace user by ID
// ----------------------------------------------
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const body = req.body;
  const index = req.findUserIndex;

  mockUsers[index] = { id: mockUsers[index].id, ...body };

  return res.status(200).json({
    message: "User updated successfully",
    updatedUser: mockUsers[index],
  });
});

// ----------------------------------------------
// PATCH: Partially update user by ID
// ----------------------------------------------
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const body = req.body;
  const index = req.findUserIndex;

  mockUsers[index] = { ...mockUsers[index], ...body };

  return res.status(200).json({
    message: `User ID ${mockUsers[index].id} updated successfully`,
    updatedUser: mockUsers[index],
  });
});

// ----------------------------------------------
// DELETE: Remove user by ID
// ----------------------------------------------
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const index = req.findUserIndex;
  const deletedUser = mockUsers.splice(index, 1)[0];

  return res.status(200).json({
    message: `User ID ${deletedUser.id} deleted successfully`,
  });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
