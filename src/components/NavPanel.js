import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavPanelStyles.css";

const NavPanel = () => {
  return (
    <nav class="nav">
      <a href="/" class="nav-title">
      DENTISTIMO
      </a>
      <ul>

        <li>
          <a href="/mainpage">Home</a>
        </li>

        <li>
          <a href="/booking">Make Appointments</a>
        </li>

        <li>
          <a href="/Settings">Settings</a>
        </li>

        <h2 class = "nav-placeholder">placeholder</h2>
        </ul>


        <ul>
        <li>
          <a href="/">Log Out</a>
        </li>
      </ul>
    
    </nav>
  );
};

export default NavPanel;
