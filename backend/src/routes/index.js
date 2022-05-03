const express = require("express");

const todoRoutes = require("./v1/todo.route");

// base route - /api
const router = express.Router();

// Health check route
router.get("/v1/health", (req, res) => res.status(200).send("UP"));

// v1 todo routes
router.use("/v1/todo", todoRoutes);

module.exports = router;
