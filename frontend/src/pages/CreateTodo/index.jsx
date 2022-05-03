/** @format */
import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTodo() {
  const [data, setData] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date(),
  });

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    setData({
      ...data,
      [name]: value,
    });
  }

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const res = await axios({
        method: "post",
        baseURL: "http://localhost:3333",
        url: "/api/v1/todo/",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);
      alert("Data Saved Successfully!");
      window.location.assign("http://localhost:3000");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <br></br>
      <form noValidate onSubmit={(e) => onSubmitForm(e)}>
        <div className="form-group">
          <label>Username :</label>
          <input
            type="text"
            name="username"
            required
            className="form-control"
            value={data.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <input
            type="text"
            name="description"
            required
            className="form-control"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (In minutes) :</label>
          <input
            type="number"
            name="duration"
            className="form-control"
            value={data.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date :</label>
          <div>
            <DatePicker
              name="date"
              selected={data.date}
              onChange={(newDate) =>
                setData({
                  ...data,
                  date: newDate,
                })
              }
            />
          </div>
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
