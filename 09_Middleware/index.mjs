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

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

app.use(loggingMiddleware, (req, res, next) => {
  console.log("Finished Logging...");
  next();
});

// Middleware: resolveIndexByUserId
// Purpose: Validates a user ID passed in the request URL and finds the corresponding user index
const resolveIndexByUserId = (req, res, next) => {
  const id = req.params.id; // Extract user ID from request parameters

  // Convert the ID string to an integer
  const parsedId = parseInt(id);

  // Validate if ID is a number
  if (isNaN(parsedId)) {
    res.status(400); // Bad request
    res.send({ message: `${id} is not a valid UserID` });
    return;
  }

  // Find index of user in the mockUsers array
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  // If user does not exist, return 404 error
  if (findUserIndex === -1)
    return res.status(404).send(`There is no user with the id ${id}`);
  req.findUserIndex = findUserIndex;
  next();
};

app.get("/", loggingMiddleware, (req, res) => {
  //passing in the middleware into the base url

  res.status(200);
  res.send({ message: "Home Page" });
});

// GET REQUEST: Retrieve all users
app.get("/api/users", (req, res) => {
  res.status(200); // Set HTTP status code to 200 (OK)
  res.send(mockUsers); // Send all users as response
});

// Route Parameters
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const findUserIndex = req.findUserIndex; // Extract the user index found by the middleware
  res.status(200);
  res.send(mockUsers[findUserIndex]);
});

// post request
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req; // destructuring the body from the request object

  // Create a new user object by:
  // 1. Assigning the ID as the last user's ID + 1
  // 2. Spreading (...body) the incoming request data (username, displayName, etc.)
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  res.status(201);
  return res.send(newUser);
});

// PUT REQUEST: Update a user by ID
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const body = req.body; // Extract the request body (new data for the user)
  const findUserIndex = req.findUserIndex; // Extract the user index found by the middleware
  const id = mockUsers[findUserIndex].id; // Get the preserved ID for logging and response messages

  // Replace the user object at the found index with updated data
  // Keep the original ID, and merge it with the new fields from the request body
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  // Log the updated user object to the console for debugging

  console.log(
    `User with ID ${id} has been updated to:`,
    mockUsers[findUserIndex]
  );

  // Respond with success message and updated user object
  return res.status(200).send({
    message: "Update Successful",
    updatedUser: mockUsers[findUserIndex],
  });
});

// PATCH REQUEST: Partially update a user
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const body = req.body; // Extract the request body (new data for the user)
  const findUserIndex = req.findUserIndex; // Extract the user index found by the middleware
  const id = mockUsers[findUserIndex].id; // Get the preserved ID for logging and response messages

  // Merge the existing user data with the new fields (partial update)
  // ✅ ensures body.id won't overwrite the true id
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  // Respond with success message and updated user object
  return res.status(200).send({
    message: `The userID ${id} has been updated.`,
    updatedUser: mockUsers[findUserIndex],
  });
});

// DELETE REQUEST: Delete a record
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const findUserIndex = req.findUserIndex; // Extract the user index found by the middleware
  const id = mockUsers[findUserIndex].id; // Get the preserved ID for logging and response messages

  // Delete the record
  mockUsers.splice(findUserIndex, 1);

  // Respond with success message and updated user object
  return res.status(200).json({
    message: `The record for userID ${id} has been deleted.`,
  });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
