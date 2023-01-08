import React from "react";
import DentistAppointment from "../components/DentistAppointment";
import "./MainPage.css";
import { useState } from "react";
import Popup from "../components/Popup";
import DentistNavPanel from "../components/DentistNavPanel";
import HeadTab from "../components/HeaderTable";



const engLang = require('../languages/english').mainpage
const sweLang = require('../languages/swedish').mainpage

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

    const [successfulDelete, setSuccessfulDelete] = useState(engLang.successfulDelete);
    const [unsuccessfulDelete, setUnsuccessfulDelete] = useState(engLang.unsuccessfulDelete );



  if(!clientLoaded){
    clientLoaded = true
    const client = new Paho.Client(brokerHost,brokerPort,clientId)
    function requestDentistAppointments() {
      const payload = {operation: 'dentist-appointments', username: uID, opCat: 'appointment'}
      const strPayload = JSON.stringify(payload)
      client.publish(`common/${uID}`, strPayload,pQos)
    }


  //handles the appointments that are recieved from the request
  const onMessage = (message) => {

    try{
      const resJSON = JSON.parse(message.payloadString)
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
    }
  }


client.onMessageArrived = onMessage;

client.connect({onSuccess: onConnect})



function onConnect () {
  client.subscribe(`${uID}/appointments`,{qos:sQos, onSuccess: () => {
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
      setSuccessfulDelete(langObj.successfulDelete);
      setUnsuccessfulDelete(langObj.unsuccessfulDelete);
    }
  }

  checkLang()


    return (
        <div>
          <DentistNavPanel></DentistNavPanel>
          <HeadTab/>
          {appointments}
          <label>{deleteResponse}</label>
          <Popup trigger={deleteResponse} setTrigger={setDeleteResp}>
            <p>{successfulDelete}</p>
          </Popup>
          <Popup trigger={errDeleteResponse} setTrigger={setErrDeleteResp}> 
            <p>{unsuccessfulDelete}</p>
          </Popup>
        </div>
      );
  }
  