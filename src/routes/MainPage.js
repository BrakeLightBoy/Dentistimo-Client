import React from "react";
import Appointment from "../components/Appointment";
import Map from "../components/Map";
import "./MainPage.css";
import { useState } from "react";
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";


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

  if(!clientLoaded){
    clientLoaded = true
    const client = new Paho.Client(brokerHost,brokerPort,clientId)


  //handles the appointments that are recieved from the request
  const onMessage = (message) => {
    try{
        const resJSON = JSON.parse(message.payloadString)
        appointments = resJSON
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
        

    } catch(e){
        console.log(e)
    }
  }

client.onMessageArrived = onMessage;

client.connect({onSuccess: onConnect})

const p_number = userNum

function onConnect () {
  client.subscribe(`${p_number}/appointments`,{qos:sQos, onSuccess: () => {
    console.log('user appoint subbed')
    console.log('pNumber',p_number)
    const payload = {operation: 'user-appointments', personal_number: p_number, opCat: 'appointment'}
    const strPayload = JSON.stringify(payload)
    client.publish(`common/${p_number}`, strPayload,pQos)
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
        {appointments}
        Personal Number: {userNum}
        
      </div>
    );
  }
