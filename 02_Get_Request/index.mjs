import express from "express";
const PORT = process.env.port || 3000;
const HOSTNAME = "localhost";

const app = express();

app.get("/", (req, res) => {
  // res.send("Hello World");
  res.status(200);
  res.send({ message: "Hello  Worlddddd" });
});

// Get all users
app.get("/api/users", (req, res) => {
  res.status(200);
  res.send([
    { id: 1, username: "John Doe", displayName: "John Doe" },
    { id: 2, username: "Jack", displayName: "Jack" },
    { id: 3, username: "Adam", displayName: "Adam" },
  ]);
});

// Get all products
app.get("/api/products", (req, res) => {
  res.status(200);
  res.send([{ id: 123, name: "Chicken breast", price: 12.99 }]);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
