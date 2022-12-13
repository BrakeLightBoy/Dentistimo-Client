import React from "react";
import Appointment from "../components/Appointment";
import Map from "../components/Map";
import "./MainPage.css";
import { useState } from "react";
import Popup from "../components/Popup";
import { useRef } from 'react';
import NavPanel from "../components/NavPanel";

let clientLoaded = false

const Paho = require('paho-mqtt')


const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const sQos = 2
const pQos = 2
//list of all the appointments that are not connected to the react variable
let nonReactAppointments = null

let isLoaded = false
let initLoad = false
let update = null

export default function Home() {
  const uID = window.localStorage.getItem('uID')
  const [deleteResponse, setDeleteResp] = useState(false);
  const [errDeleteResponse, setErrDeleteResp] = useState(false);

  if(!clientLoaded){
    clientLoaded = true
    const client = new Paho.Client(brokerHost,brokerPort,clientId)
    function requestUserAppointments() {
      const payload = {operation: 'user-appointments', personal_number: uID, opCat: 'appointment'}
      const strPayload = JSON.stringify(payload)
      client.publish(`common/${uID}`, strPayload,pQos)
    }

  

  //handles the appointments that are recieved from the request
  const onMessage = (message) => {

    try{
      const resJSON = JSON.parse(message.payloadString)
      console.log('OP: ' + resJSON.operation)
      switch(resJSON.operation){
        case 'delete-user-appointment':
          if(resJSON.success){
            setDeleteResp(true);
            requestUserAppointments();
          } else {
            setErrDeleteResp(true);
          }
          break;
        case 'user-appointments':
            appointments = resJSON.data
          console.log("RES appoint:",appointments)
          let n = -1
          
          nonReactAppointments = appointments.map(appointment => {
              n++;
              const info = appointment
              return <Appointment appointmentInfo={info} key={n} />
          })

          if(isLoaded){
              update(nonReactAppointments)
          }
            break;  
        default:
          
          break;
      }
    } catch(e){
        console.log(e)
    }
  }

client.onMessageArrived = onMessage;

client.connect({onSuccess: onConnect})


function onConnect () {
  client.subscribe(`${uID}/appointments`,{qos:sQos, onSuccess: () => {
    console.log('user appoint subbed')
    console.log('pNumber',uID)
    const payload = {operation: 'user-appointments', personal_number: uID, opCat: 'appointment'}
    const strPayload = JSON.stringify(payload)
    client.publish(`common/${uID}`, strPayload,pQos)
  }})
}
  }


  let [appointments, setAppointments] = useState([])

   isLoaded = true

    
  if(nonReactAppointments && !initLoad){
    setAppointments(nonReactAppointments)
    initLoad =true
  }
    
  update = (newAppointments) =>{
    setAppointments(newAppointments)
  }


    return (
      <div>
        <NavPanel></NavPanel>
        {appointments}
        <label>Hello: {deleteResponse}</label>
        <Popup trigger={deleteResponse} setTrigger={setDeleteResp}>
        <p>Appointment successfully deleted</p>
        </Popup>
        <Popup trigger={errDeleteResponse} setTrigger={setErrDeleteResp}> 
        <p>Appointment could not be deleted</p>
        </Popup>
        Personal Number: {uID}
      </div>
    );
  }
