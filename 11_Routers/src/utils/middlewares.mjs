// ----------------------------------------------
// Middleware: Find User Index by ID
// ----------------------------------------------
import mockUsers from "./db.mjs";

const resolveIndexByUserId = (req, res, next) => {
  const id = req.params.id;
  const parsedId = parseInt(id, 10);

  // Check if ID is a valid number
  if (isNaN(parsedId)) {
    return res.status(400).send({ message: `${id} is not a valid UserID` });
  }

  // Find user index
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return res.status(404).send(`There is no user with the id ${id}`);
  }

  req.findUserIndex = findUserIndex; // Attach index to request
  next(); // Continue to next handler
};

export default resolveIndexByUserId;
