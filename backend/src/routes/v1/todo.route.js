const express = require("express");

const TodoController = require("../../controllers/todo.controller.js");

//route - /api/v1/todo
const router = express.Router();

router.get("/health", (req, res) => res.status(200).send("UP"));

router.get("/", TodoController.findAll);
router.get("/:id", TodoController.findOne);
router.post("/", TodoController.create);
router.patch("/:id", TodoController.update);
router.delete("/:id", TodoController.todoDelete);

module.exports = router;
