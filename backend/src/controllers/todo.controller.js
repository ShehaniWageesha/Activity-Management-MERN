const TodoService = require("../services/todo.service");
const { validationResult } = require("express-validator");
const httpStatus = require("http-status");

// Create and Save a new todo exercise
const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: "Invalid request", errors: errors.array() });
    }

    const { username, description, duration, date } = req.body;

    const result = await TodoService.createTodos({
      username,
      description,
      duration,
      date,
    });
    return res.status(httpStatus.OK).json({ result });
  } catch (error) {
    return res.status(httpStatus[400]).json({ error });
  }
};

// Find all todo exercises
const findAll = async function (req, res) {
  try {
    var todos = await TodoService.getTodos();
    return res.status(200).json({
      status: 200,
      data: todos,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// Find a single todo exercise with an id
const findOne = async (req, res) => {
  try {
    const todo = await TodoService.getTodoById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a todo exercise by the id in the request
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, description, duration, date } = req.body;

    const result = await TodoService.updateTodo({
      id,
      username,
      description,
      duration,
      date,
    });

    return res.status(httpStatus.OK).json({ result });
  } catch (error) {
    return res.status(httpStatus[400]).json({ error });
  }
};

// Delete a todo exercise with the specified id in the request
const todoDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await TodoService.deleteTodo(id);

    return res.status(httpStatus.OK).json({ result });
  } catch (error) {
    return res.status(httpStatus[400]).json({ error });
  }
};

module.exports = {
  create,
  findOne,
  findAll,
  update,
  todoDelete,
};
