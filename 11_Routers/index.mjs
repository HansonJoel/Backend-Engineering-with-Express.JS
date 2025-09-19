// ----------------------------------------------
// Import the express framework
// ----------------------------------------------
import express from "express";

// Import routers (user and product routes)
import userRouter from "./src/routes/users.mjs";
import productsRouter from "./src/routes/products.mjs";

// ----------------------------------------------
// Server Configurations
// ----------------------------------------------
const PORT = process.env.PORT || 3000; // Default: 3000
const HOSTNAME = "localhost";

// ----------------------------------------------
// Initialize Express App
// ----------------------------------------------
const app = express();

// Middleware to parse JSON bodies from requests
app.use(express.json());

// Mount routers (separate route files for modularity)
app.use(userRouter);
app.use(productsRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).send({ message: "Home Page" });
});

// ----------------------------------------------
// Start the server
// ----------------------------------------------
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
