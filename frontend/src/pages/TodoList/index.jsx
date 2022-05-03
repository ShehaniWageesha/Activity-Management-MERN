import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../routes/route-paths";
import { format } from "date-fns";

function TodosList() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tempTodo = await getData();
      setTodo(tempTodo);
      console.log(JSON.stringify(tempTodo));
    };
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const finalURL = "http://localhost:3333/api/v1/todo/";
      const res = await axios.get(finalURL);
      return res.data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = (_id) => {
    try {
      if (window.confirm("Are you sure?")) {
        fetch("http://localhost:3333/api/v1/todo/" + _id, {
          method: "delete",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
        });
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <br></br>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((item) => (
            <tr key="{item._id}">
              <td>{item.username}</td>
              <td>{item.description}</td>
              <td>{item.duration}</td>
              <td>{format(new Date(item.date), "yyyy-MM-dd")}</td>
              <td>
                <Link
                  to={`${RoutePaths.edit}${item._id}`}
                  style={{
                    color: "green",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Edit |{" "}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  onClick={() => removeTodo(item._id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodosList;
