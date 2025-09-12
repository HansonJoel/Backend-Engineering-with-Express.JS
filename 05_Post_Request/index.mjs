import express from "express";
const PORT = process.env.port || 3000;
const HOSTNAME = "localhost";

// In memory database
const mockUsers = [
  { id: 1, username: "John", displayName: "John" },
  { id: 2, username: "Jack", displayName: "Jack" },
  { id: 3, username: "Adam", displayName: "Adam" },
  { id: 4, username: "Jason", displayName: "Jason" },
  { id: 5, username: "Henry", displayName: "Henry" },
  { id: 6, username: "Mary", displayName: "Mary" },
  { id: 7, username: "Marilyn", displayName: "Marilyn" },
];

const app = express();

app.use(express.json()); // inbuild express middleware


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

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
