import React, { useState } from "react";
import "./AppointmentStyles.css";


const Paho = require('paho-mqtt')

const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const client = new Paho.Client(brokerHost,brokerPort,clientId)
const sQos = 2
const pQos = 2

const engLang = require('../languages/english').appointments
const sweLang = require('../languages/swedish').appointments

client.connect({onSuccess: onConnect})

function onConnect () {
  console.log('CONN SUCC LOGIN')
}


const Appointment = ({appointmentInfo, deleteFunc, editFunc}) => {
  const uID = window.localStorage.getItem('uID')
  console.log("appINFO:",appointmentInfo)

  
  const [appointmentTitle, setAppointmentTitle] = useState(engLang.appointmentTitle);
  const [dentistName, setDentist] = useState(engLang.dentist);
  const [clinicName, setClinic] = useState(engLang.clinic);
  const [requestNum, setRequest] = useState(engLang.request);
  const [deleteButtonText, setDeleteButtonText] = useState(engLang.deleteButtonText);
  const [issuanceNum, setIssuance] = useState(engLang.issuance);
  const [dateNum, setDate] = useState(engLang.date);
  const [timeNum, setTime] = useState(engLang.time);
  
  const issuance = appointmentInfo.issuance
  const date = new Date(appointmentInfo.date)
  const appointmentDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
  const appointmentTime = date.getHours() + ':' + date.getMinutes()
  const request  = appointmentInfo.request_id
  const dentist = appointmentInfo.dentist_id.first_name + " "+  appointmentInfo.dentist_id.last_name
  const clinic = appointmentInfo.dentist_id.works_at[0].name
  const appointment = appointmentInfo._id
  
  function deleteFunc() {
    const payload = {operation: 'delete-user-appointment', appointment_id:appointment, opCat: 'appointment'}
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
          setDentist(langObj.dentist);
          setClinic(langObj.clinic);
          setRequest(langObj.request);
          setDeleteButtonText(langObj.deleteButtonText);
          setIssuance(langObj.issuance);
          setDate(langObj.date);
          setTime(langObj.time);
        }
    }

    checkLang()

  return (
    <div className = "body">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
    <div className="app-box">
      <h2>{appointmentTitle} #123</h2>
      <p>{dentistName}: {dentist} </p>
      <p>{clinicName}: {clinic} </p>
      <p>{requestNum}: {request} </p>
      <p>{appointmentTitle}: {appointment} </p>
      <p>{issuanceNum}: {issuance} </p>
      <p>{dateNum}: {appointmentDate} </p>
      <p>{timeNum}: {appointmentTime}</p>
      <button onClick={deleteFunc}>{deleteButtonText}</button>
      </div>
    </div>
  );
};





export default Appointment;
