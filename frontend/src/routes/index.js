/** @format */
import React from "react";
import { Route } from "react-router-dom";
import CreateTodo from "../pages/CreateTodo";
import EditTodos from "../pages/EditTodo";
import TodosList from "../pages/TodoList";
import { RoutePaths } from "./route-paths";

const Routes = () => {
  const paths = RoutePaths;

  return (
    <>
      <Route path="/" exact component={TodosList} />
      <Route path={`${paths.edit}:id`} component={EditTodos} />
      <Route path={paths.create} component={CreateTodo} />
    </>
  );
};

export default Routes;
