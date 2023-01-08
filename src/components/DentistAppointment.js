import React, { Component, useEffect, useState } from "react";
import "./AppointmentStyles.css";


const engLang = require('../languages/english').appointments
const sweLang = require('../languages/swedish').appointments

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

  const [appointmentTitle, setAppointmentTitle] = useState(engLang.appointmentTitle);
  const [patientName, setDentist] = useState(engLang.patient);
  const [clinicName, setClinic] = useState(engLang.clinic);
  const [deleteButtonText, setDeleteButtonText] = useState(engLang.deleteButtonText);
  const [issuanceNum, setIssuance] = useState(engLang.issuance);
  const [dateNum, setDate] = useState(engLang.date);
  const [timeNum, setTime] = useState(engLang.time);
  
  const issuance = appointmentInfo.issuance
  const date = new Date(appointmentInfo.date)
  const appointmentDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
  const appointmentTime = addZero(date.getHours()) + ':' + addZero(date.getMinutes())
  const clinic = appointmentInfo.dentist_id.works_at[0].name
  const patient = appointmentInfo.user_id.first_name + ' ' + appointmentInfo.user_id.last_name
  const appointment = appointmentInfo._id

  function addZero(i) {
    if (i < 10) {
      i = "0" + i
    }
    return i;
  }

  function deleteFunc() {
    const payload = {operation: 'delete-dentist-appointment', appointment_id:appointment, opCat: 'appointment'}
    const strPayload = JSON.stringify(payload)
    console.log(`common/${uID}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${uID}/#`,{qos:sQos, onSuccess: () => {
    client.publish(`common/${uID}`, strPayload,pQos)
  }}) 
  }
  
  const chosenLang = localStorage.getItem('lang');
  const [pageLang, setLang] = useState('eng');   

  function checkLang() {
      if(chosenLang !== pageLang){
      
      setLang(chosenLang)
      let langObj = null
      switch (chosenLang) {
          case 'eng':
          langObj = engLang  
          break;
          case 'swe':
          langObj = sweLang
          break;
          default:
          langObj = engLang
          break;
      }
       setAppointmentTitle(langObj.appointmentTitle);
       setDentist(langObj.patient);
       setClinic(langObj.clinic);
       setDeleteButtonText(langObj.deleteButtonText);
       setIssuance(langObj.issuance);
       setDate(langObj.date);
       setTime(langObj.time);
      }
  }

  checkLang()


  return (
    <>
    <div className="app-box">
      <h3>{appointmentTitle} </h3>
      <p>{patientName}: {patient} </p>
      <p>{clinicName}: {clinic} </p>
      <p>{issuanceNum}: {issuance} </p>
      <p>{dateNum}: {appointmentDate} </p>
      <p>{timeNum}: {appointmentTime}</p>
      <button onClick={deleteFunc}>{deleteButtonText}</button>
      </div>
    </>
  );
};



export default DentistAppointment;
