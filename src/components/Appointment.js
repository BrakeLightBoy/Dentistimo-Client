import React, { Component, useEffect } from "react";
import "./AppointmentStyles.css";
import LoginContext from "../contexts/LoginContext";
import { useContext } from "react";

const Appointment = () => {
  const { userNum } = useContext(LoginContext);

  return (
    <>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
    <div class="app-box">
      <h2>Appointment #123</h2>
      <p>user id: {userNum}</p>
      <p>dentist id: </p>
      <p>request id: </p>
      <p>appointment id: </p>
      <p>issuance: </p>
      <p>date: </p>
      <p>time: </p>
      <button>delete</button>
      <button>edit</button>
      </div>
    </>
  );
};



export default Appointment;
