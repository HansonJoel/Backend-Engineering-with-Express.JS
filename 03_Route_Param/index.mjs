import express from "express";
const PORT = process.env.PORT || 3000;
const HOSTNAME = "localhost";

// In memory database
const mockUsers = [
  { id: 1, username: "John Doe", displayName: "John Doe" },
  { id: 2, username: "Jack", displayName: "Jack" },
  { id: 3, username: "Adam", displayName: "Adam" },
];

const app = express();

app.get("/api/users", (req, res) => {
  res.status(200).send(mockUsers);
});

// Single Route parameter
app.get("/api/users/:id", (req, res) => {
  // console.log(req.params);
  const parsedId = parseInt(req.params.id); //got the id and converted in to int
  if (isNaN(parsedId)) {
    return res.status(400).send({ message: "Bad Request. Invalid ID" });
  }

  // search for id in the database
  const findUser = mockUsers.find((user) => user.id === parsedId);

  if (!findUser) {
    return res.status(404).send({ message: "User not found" });
  } else {
    res.status(200).send(findUser);
  }
});

/*
// Multiple Route parameter
app.get("/api/users/:id/:name/:display", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.params.name;
  const displayName = req.params.display;

  if (isNaN(id)) {
    return res.status(400).send({ message: "Invalid id" });
  }
  const user = mockUsers.find(
    (user) =>
      user.id === id &&
      user.username === name &&
      user.displayName === displayName
  );

  if (!user) {
    return res.status(404).send(`No user found with id ${id} and name ${name}`);
  }

  res.status(200);
  res.send(user);
});
*/

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
