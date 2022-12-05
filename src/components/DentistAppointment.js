import React, { Component, useEffect } from "react";
import "./AppointmentStyles.css";


const Paho = require('paho-mqtt')

const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const client = new Paho.Client(brokerHost,brokerPort,clientId)
const sQos = 2
const pQos = 2

client.connect({onSuccess: onConnect})

function onConnect () {
  console.log('CONN SUCC LOGIN')
}

const DentistAppointment = ({appointmentInfo, deleteFunc, editFunc}) => {
  const uID = window.localStorage.getItem('uID')
  console.log("appINFO:",appointmentInfo)
  
  const issuance = appointmentInfo.issuance
  const date = new Date(appointmentInfo.date)
  const appointmentDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
  const appointmentTime = date.getHours() + ':' + date.getMinutes()
  const request  = appointmentInfo.request_id
  const clinic = appointmentInfo.dentist_id.works_at[0].name
  const patient = appointmentInfo.user_id.first_name + ' ' + appointmentInfo.user_id.last_name
  const appointment = appointmentInfo._id

  function deleteFunc() {
    const payload = {operation: 'delete-dentist-appointment', appointment_id:appointment, opCat: 'appointment'}
    const strPayload = JSON.stringify(payload)
    console.log(`common/${uID}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${uID}/#`,{qos:sQos, onSuccess: () => {
    client.publish(`common/${uID}`, strPayload,pQos)
  }}) 
  }
  

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
      <button onClick={deleteFunc}>delete</button>
      </div>
    </>
  );
};



export default DentistAppointment;
