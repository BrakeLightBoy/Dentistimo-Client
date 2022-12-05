import React from "react";
import "./BookingStyles.css";
import AvailableAppointment from "../components/AvailableAppointment";


import Map from "../components/Map";

import { useState, useRef } from "react";
import UserDetails from "../UserDetails";
const uDetails = new UserDetails()

let clientLoaded = false

const Paho = require('paho-mqtt')


const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

let currentClinic= null
let currentUser= null
const sQos = 2
const pQos = 2
//list of all the appointments that are not connected to the react variable
let nonReactAppointments = null

let isLoaded = false
let initLoad = false
let update = null

let requestAppointments = null
let isConnected = false
let currentSub = null

export const Booking = () =>{
  const cId = useRef(null);
  const mNum = useRef(null);
  const yNum = useRef(null);
  const uID = window.localStorage.getItem('uID')
  const u = uDetails.getUser()
  console.log("USER_ID:",u)
  if(!clientLoaded){
    clientLoaded = true
    const client = new Paho.Client(brokerHost,brokerPort,clientId)

    const bookAppointment = (date) => {
    
      const payload = {operation: 'book-appointment', date:date, clinicId:currentClinic, userId:uID, opCat: 'appointment'}
      const strPayload = JSON.stringify(payload)
      client.publish(`common/common`, strPayload,pQos)
    }

  //handles the appointments that are recieved from the request
  const onMessage = (message) => {
    try{
        const resJSON = JSON.parse(message.payloadString)
        appointments = resJSON
        console.log("RES appoint:",appointments)
        let n = -1
        
        nonReactAppointments = appointments.slots.map(appointment => {
            n++;
            const info = appointment
            info.month = appointments.m
            info.year = appointments.yr
            return <AvailableAppointment appointmentInfo={info} bookFunc={bookAppointment} key={n} />
        })

        if(isLoaded){
            update(nonReactAppointments)
        } 
        

    } catch(e){
        console.log(e)
    }
  }

  function reqApp() {
    console.log("RUNNNNNNS")
    if(isConnected){
      let clinic = null
      let year = null
      let month = null

      if(cId.current && yNum.current && yNum.current){
        clinic = cId.current.value
        year = yNum.current.value
        month = mNum.current.value

        cId.current.value = null
        yNum.current.value = null
        mNum.current.value = null
      } else {
        return
      }
      if(currentSub){
        client.unsubscribe(currentSub)
      }

      currentSub = `clinics/${clinic}/${year}/${month}`
      currentClinic = clinic
      currentUser = uDetails.getUser()

      client.subscribe(currentSub,{qos:sQos, onSuccess: () => {
        console.log('user appoint subbed')
        console.log('pNumber', uID)
        const payload = {operation: 'unbooked-appointments', year: year, month:month, clinicId:clinic, opCat: 'appointment'}
        const strPayload = JSON.stringify(payload)
        client.publish(`common/common`, strPayload,pQos)
      }})
    }
  }

  requestAppointments = reqApp

  client.onMessageArrived = onMessage;

  client.connect({onSuccess: onConnect})

  function onConnect () {
    isConnected = true
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
      
      <p className="header">Available Appointments</p>
      
      <button className="invis"></button>   
      <div>
        <button className="Sort" onClick={requestAppointments}>Get</button>
        <input ref={cId} type="text" className="input-field" placeholder="Clinic Id"></input>
        <input ref={mNum} type="text" className="input-field" placeholder="Month"></input>
        <input ref={yNum} type="text" className="input-field" placeholder="Year"></input>
        {/* <button className="Sort">Filter by</button>   */}
      </div> 
      <div className="AList">
          {appointments}
      </div>
      <Map zoom={10} center={{"lat":57.75,"lng":11.92}}  />
    </div>
  )
};

export default Booking;