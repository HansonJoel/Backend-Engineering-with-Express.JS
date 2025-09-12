// Import the express framework
import express from "express";

// Define server configurations
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
const HOSTNAME = "localhost";

// -------------------------------
// Mock database (in-memory array)
// -------------------------------
const mockUsers = [
  { id: 1, username: "John", displayName: "John" },
  { id: 2, username: "Jack", displayName: "Jack" },
  { id: 3, username: "Adam", displayName: "Adam" },
  { id: 4, username: "Jason", displayName: "Jason" },
  { id: 5, username: "Henry", displayName: "Henry" },
  { id: 6, username: "Mary", displayName: "Mary" },
  { id: 7, username: "Marilyn", displayName: "Marilyn" },
];

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// -------------------------------
// GET REQUEST: Retrieve all users
// -------------------------------
app.get("/api/users", (req, res) => {
  res.status(200); // Set HTTP status code to 200 (OK)
  res.send(mockUsers); // Send all users as response
});

// ----------------------------------------
// PATCH REQUEST: Partially update a user
// ----------------------------------------
app.patch("/api/users/:id", (req, res) => {
  // Extract user ID from route params and body data from request body
  // Alternative with destructuring:
  // const { body, params: { id } } = req;
  const id = req.params.id;
  const body = req.body;

  // Convert the ID string to an integer
  const parsedId = parseInt(id);

  // Validate if ID is a number
  if (isNaN(parsedId)) {
    res.status(400); // Bad Request
    res.send(`${id} is not a valid UserID`);
    return;
  }

  // Search for user index in the mockUsers array
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  // If user does not exist, return 404
  if (findUserIndex === -1) {
    return res.status(404).send(`There is no user with the id ${id}`);
  }

  // Merge the existing user data with the new fields (partial update)
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  // Respond with success message and updated user object
  return res.status(200).json({
    message: `The userID ${id} has been updated.`,
    updatedUser: mockUsers[findUserIndex],
  });
});

// -------------------------------
// Start the server
// -------------------------------
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
