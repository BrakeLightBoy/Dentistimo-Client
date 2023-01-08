import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavPanelStyles.css";

const DentistNavPanel = () => {
  return (
    <nav class="nav">
      <a href="/" class="nav-title">
        Project Titan
      </a>
      <ul>

        <li>
          <a href="/dentist">Home</a>
        </li>


        <li>
          <a href="/SettingsDentist">Settings</a>
        </li>
        <li>
          <a href="/">Log Out</a>
        </li>

      </ul>
    
    </nav>
  );
};

export default DentistNavPanel;
