const httpStatus = require("http-status");
const mongoose = require("mongoose");
const TodoModel = require("../models/todo.model");
const APIError = require("../helpers/api-error");
const logger = require("../helpers/logger");

const createTodos = async ({ username, description, duration, date }) => {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const todo = new TodoModel({
      username,
      description,
      duration,
      date,
    });

    const createTodos = await todo.save({ session });

    if (!createTodos) {
      throw new APIError({
        message: "Error occured while creating a todo",
        status: httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: false,
      });
    }

    await session.commitTransaction();

    return {
      message: "Todo creation done successfully",
      data: todo.id,
    };
  } catch (error) {
    logger.error("Error occured while creating a todo", error);
    if (session) {
      await session.abortTransaction();
    }
    throw new APIError(error);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getTodos = async function (data) {
  try {
    const allTodos = await TodoModel.find(data);
    return {
      message: "Listing all todos",
      data: allTodos,
    };
  } catch (e) {
    // Log Errors
    throw Error("Error while getting todos");
  }
};

const getTodoById = async (id) => {
  try {
    const foundTodo = await TodoModel.findById(id);
    console.log("Todos : ", foundTodo);
    return {
      message: "Listing a single todo",
      data: foundTodo,
    };
  } catch (error) {
    logger.error("Error occured while reading the todo", error);
    throw new APIError(error);
  }
};

const updateTodo = async ({ id, username, description, duration, date }) => {
  try {
    const todo = await TodoModel.findById(id);

    todo.overwrite({ username, description, duration, date });
    await todo.save();

    return {
      message: "Todo updated successfully",
      data: todo,
    };
  } catch (error) {
    logger.error("Error occured while updating the todo", error);
  }
};

const deleteTodo = async (id) => {
  try {
    const todo = await TodoModel.deleteOne({ _id: id });
    console.log(todo);
    return {
      message: "Todo deleted successfully",
    };
  } catch (error) {
    logger.error("Error occured while deleting the todo", error);
  }
};

module.exports = {
  createTodos,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
