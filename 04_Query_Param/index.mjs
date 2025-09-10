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

// Query Param
app.get("/api/users", (req, res) => {
  console.log(req.query);
  const { filter, value } = req.query; //destructure and extract the filter and value from the query param

  // when filter and value are not provided
  if (!filter && !value) {
    return res.json(mockUsers);
  }

  // when filter and value are provided
  if (filter && value) {
    // const query = mockUsers.filter((user) => user[filter].includes(value));
    // console.log(query);

    //check if filter exists in user object
    if (!Object.keys(mockUsers[0]).includes(filter)) {
      return res
        .status(400)
        .send({ message: `Invalid filter field: ${filter}` });
    }

    // if filter exits
    const results = mockUsers.filter((user) =>
      String(user[filter]).toLowerCase().includes(value.toLowerCase())
    );

    if (results.length === 0) {
      return res.status(404).send({
        message: `No records found where ${filter} contains '${value}'`,
      });
    }
    return res.json(results);
  }

  return res.status(400).send({
    message: "Both 'filter' and 'value' query parameters are required.",
  });
  // return res.send(mockUsers.filter((user) => user[filter].includes(value)));
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
