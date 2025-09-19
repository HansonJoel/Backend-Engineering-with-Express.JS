// ----------------------------------------------
// User Routes
// ----------------------------------------------
import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";

// Import validation schema, mock database, and middleware
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import mockUsers from "../utils/db.mjs";
import resolveIndexByUserId from "../utils/middlewares.mjs";

const router = Router();

// ----------------------------------------------
// GET: Fetch all users
// ----------------------------------------------
router.get(
  "/api/users",
  query("filter") // Example query validation
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("Filter must be between 3 and 10 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result); // Logs validation result
    res.status(200).send(mockUsers);
  }
);

// ----------------------------------------------
// GET: Fetch a single user by ID (with middleware)
// ----------------------------------------------
router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  res.status(200).send(mockUsers[req.findUserIndex]);
});

// ----------------------------------------------
// POST: Create a new user
// ----------------------------------------------
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema), // Validation rules
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req); // Extract validated data only
    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      ...data,
    };

    mockUsers.push(newUser);
    res.status(201).send(newUser);
  }
);

// ----------------------------------------------
// PUT: Replace a user by ID
// ----------------------------------------------
router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const body = req.body;
  const index = req.findUserIndex;
  const id = mockUsers[index].id;

  // Replace user (ID preserved, rest replaced)
  mockUsers[index] = { id, ...body };

  console.log(`User with ID ${id} updated:`, mockUsers[index]);

  return res.status(200).send({
    message: "Update Successful",
    updatedUser: mockUsers[index],
  });
});

// ----------------------------------------------
// PATCH: Partially update a user
// ----------------------------------------------
router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const body = req.body;
  const index = req.findUserIndex;
  const id = mockUsers[index].id;

  // Merge existing + new data
  mockUsers[index] = { ...mockUsers[index], ...body };

  return res.status(200).send({
    message: `The userID ${id} has been updated.`,
    updatedUser: mockUsers[index],
  });
});

// ----------------------------------------------
// DELETE: Remove a user by ID
// ----------------------------------------------
router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const index = req.findUserIndex;
  const id = mockUsers[index].id;

  mockUsers.splice(index, 1); // Delete user

  return res.status(200).json({
    message: `The record for userID ${id} has been deleted.`,
  });
});

export default router;
