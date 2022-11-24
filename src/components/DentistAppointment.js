import React, { Component, useEffect } from "react";
import "./AppointmentStyles.css";
import LoginContext from "../contexts/LoginContext";
import { useContext } from "react";



const DentistAppointment = ({appointmentInfo, deleteFunc, editFunc}) => {
  console.log("appINFO:",appointmentInfo)
  
  const issuance = appointmentInfo.issuance
  const date = new Date(appointmentInfo.date)
  const appointmentDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
  const appointmentTime = date.getHours() + ':' + date.getMinutes()
  const request  = appointmentInfo.request_id
  const clinic = appointmentInfo.dentist_id[0].works_at[0].name
  const patient = appointmentInfo.user_id[0].first_name + ' ' + appointmentInfo.user_id[0].last_name
  const appointment = appointmentInfo._id

  return (
    <>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
    <div className="app-box">
      <h2>Appointment #123</h2>
      <p>Patient: {patient}</p>
      <p>Clinc: {clinic} </p>
      <p>Request: {request} </p>
      <p>Appointment: {appointment} </p>
      <p>issuance: {issuance} </p>
      <p>Date: {appointmentDate}</p>
      <p>Time: {appointmentTime}</p>
      <button>delete</button>
      </div>
    </>
  );
};



export default DentistAppointment;
