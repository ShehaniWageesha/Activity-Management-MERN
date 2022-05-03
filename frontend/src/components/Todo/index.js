import React from "react";

const Todo = (props) => (
  <tr>
    <td>{props.todo.username}</td>
    <td>{props.todo.description}</td>
    <td>{props.todo.duration}</td>
    <td>{props.todo.date.substring(0, 10)}</td>

  </tr>
);

export default Todo;
