/** @format */

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-md">
    <Link to="/" className="navbar-brand">
      Exercise Tracker
    </Link>

    <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/" className="nav-link">
            Exercises
          </Link>
        </li>

        <li className="navbar-item">
          <Link to="/create" className="nav-link">
            Create Exercise
          </Link>
        </li>

        <li className="navbar-item">
          <Link className="nav-link">Create User</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
