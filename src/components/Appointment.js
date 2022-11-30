import React from "react";
import "./AppointmentStyles.css";




const Appointment = ({appointmentInfo, deleteFunc, editFunc}) => {
  console.log("appINFO:",appointmentInfo)
  
  const issuance = appointmentInfo.issuance
  const date = appointmentInfo.date
  const request  = appointmentInfo.request_id
  const dentist = appointmentInfo.dentist_id[0].first_name + " "+  appointmentInfo.dentist_id[0].last_name
  const clinic = appointmentInfo.dentist_id[0].works_at[0].name
  const appointment = appointmentInfo._id

  return (
    <>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
    <div className="app-box">
      <h2>Appointment #123</h2>
      <p>Dentist: {dentist} </p>
      <p>Clinc: {clinic} </p>
      <p>Request: {request} </p>
      <p>Appointment: {appointment} </p>
      <p>issuance: {issuance} </p>
      <p>Date: {date} </p>
      <p>Time: </p>
      <button>delete</button>
      <button>edit</button>
      </div>
    </>
  );
};





export default Appointment;
