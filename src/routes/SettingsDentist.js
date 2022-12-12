import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import NavPanel from "../components/NavPanel";

function SettingsDentist() {
  return (
    <>
    <NavPanel></NavPanel>
    <h1>Settings - Dentist</h1>
    <h2>Email Address</h2>
    <input type="text" placeholder="Email"></input>
    <h2>first name</h2>
    <input type="text" placeholder="first name"></input>
    <h2>last name</h2>
    <input type="text" placeholder="last name"></input>

    <h2>username</h2>
    <input type="text" placeholder="first name"></input>

    <h2>password</h2>
    <input type="text" placeholder="password"></input>
    <button>Save</button>
    </>
  )
}

export default SettingsDentist;
