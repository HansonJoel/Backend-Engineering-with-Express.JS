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

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// -------------------------------
// GET REQUEST: Retrieve all users
// -------------------------------
app.get("/api/users", (req, res) => {
  res.status(200); // Set HTTP status code
  res.send(mockUsers); // Send back all users
});

// --------------------------------
// PUT REQUEST: Update a user by ID
// --------------------------------
app.put("/api/users/:id", (req, res) => {
  // Extract user ID from request parameters and body data from request body
  // Example with destructuring: const { body, params: { id } } = req;
  const id = req.params.id;
  const body = req.body;

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
  if (findUserIndex === -1) {
    return res.status(404).send(`There is no user with the id ${id}`);
  } else {
    // Update user with new data (spread operator merges old ID with new body)
    mockUsers[findUserIndex] = { id: parsedId, ...body };

    // Log update to console
    console.log(
      `User with ID ${id} has been updated to:`,
      mockUsers[findUserIndex]
    );

    // Respond with success message and updated user object
    return res.status(200).send({
      message: "Update Successful",
      updatedUser: mockUsers[findUserIndex],
    });
  }
});

// -------------------------------
// Start the server
// -------------------------------
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
