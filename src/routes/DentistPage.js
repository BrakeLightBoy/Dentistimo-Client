import React from "react";
import DentistAppointment from "../components/DentistAppointment";
import Map from "../components/Map";
import "./MainPage.css";
import { useState } from "react";
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";
import Popup from "../components/Popup";

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
    const { userNum } = useContext(LoginContext);
    const username = userNum
    const [deleteResponse, setDeleteResp] = useState(false);
    const [errDeleteResponse, setErrDeleteResp] = useState(false);


  if(!clientLoaded){
    clientLoaded = true
    const client = new Paho.Client(brokerHost,brokerPort,clientId)
    function requestDentistAppointments() {
      const payload = {operation: 'dentist-appointments', username: username, opCat: 'appointment'}
      const strPayload = JSON.stringify(payload)
      client.publish(`common/${username}`, strPayload,pQos)
    }


  //handles the appointments that are recieved from the request
  const onMessage = (message) => {

    try{
      const resJSON = JSON.parse(message.payloadString)
      console.log('OP: ' + resJSON.operation)
      switch(resJSON.operation){
        case 'delete-dentist-appointment':
          if(resJSON.success){
            setDeleteResp(true);
            requestDentistAppointments();
          } else {
            setErrDeleteResp(true);
          }
          break;
        default:
          appointments = resJSON
          console.log("RES appoint:",appointments)
          let n = -1
          
          nonReactAppointments = appointments.map(appointment => {
              n++;
              const info = appointment
              return <DentistAppointment appointmentInfo={info} key={n} />
          })

          if(isLoaded){
              update(nonReactAppointments)
          }
          break;
      }
    } catch(e){
        console.log(e)
    }
  }


client.onMessageArrived = onMessage;

client.connect({onSuccess: onConnect})



function onConnect () {
  client.subscribe(`${username}/appointments`,{qos:sQos, onSuccess: () => {
    console.log('user appoint subbed')
    console.log('pNumber',username)
    requestDentistAppointments();
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
          <Map zoom={10} center={{"lat":57.75,"lng":11.92}} />
          {appointments}
          <label>{deleteResponse}</label>
          <Popup trigger={deleteResponse} setTrigger={setDeleteResp}>
            <p>Appointment successfully deleted</p>
          </Popup>
          <Popup trigger={errDeleteResponse} setTrigger={setErrDeleteResp}> 
            <p>Appointment could not be deleted</p>
          </Popup>
        </div>
      );
  }
  