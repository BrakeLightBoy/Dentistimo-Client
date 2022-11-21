import React from "react";
import { Link } from "react-router-dom";

import "./NavbarStyles.css";

const NavBar = () => {
  return (
    <div className="header">
      <Link to="/">
        <h1>PROJECT TITAN</h1>{" "}
      </Link>
      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
        <li>
          <button><Link to="/login">Log In</Link></button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
