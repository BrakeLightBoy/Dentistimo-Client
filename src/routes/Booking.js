import React from "react";
import "./BookingStyles.css";
import AvailableAppointment from "../components/AvailableAppointment";
import Popup from "../components/Popup";
import Calendar from "../components/Calendar";

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

let nonReactEntries = null

let isLoaded = false
let initLoad = false
let update = null

let requestAppointments = null
let isConnected = false
let currentSub = null

let bFunc = null

export const Booking = () =>{
  const [bookingResponse, setBookingResp] = useState(false);
  const [errBookingResponse, setErrBookingResp] = useState(false);
  const cId = useRef(null);
  const mNum = useRef(null);
  const yNum = useRef(null);
  const uID = window.localStorage.getItem('uID')
  const u = uDetails.getUser()

  const [freeAppointments, setFAppointments] = useState([]); 

  console.log("USER_ID:",u)
  if(!clientLoaded){
    clientLoaded = true
    const client = new Paho.Client(brokerHost,brokerPort,clientId)

    const bookAppointment = (date) => {
      console.log('booking.com :',date)
      const payload = {operation: 'book-appointment', date:date, clinicId:currentClinic, userId:uID, opCat: 'appointment'}
      const strPayload = JSON.stringify(payload)
      client.publish(`common/${uID}`, strPayload,pQos)
    }

    bFunc = bookAppointment

  //handles the appointments that are recieved from the request
  const onMessage = (message) => {
    try{
      const resJSON = JSON.parse(message.payloadString)
      console.log('OP: ' + resJSON.operation)
      switch(resJSON.operation){
        case 'book-appointment':
          if(resJSON.success){
            console.log('SUCCESS WOOOO')
            setBookingResp(true);
          } else {
            setErrBookingResp(true);
          }
          break;
        case 'clinic-free-slots':
          appointments = resJSON.data
          console.log("RES appoint:",appointments)
          let n = -1
        
          nonReactAppointments = appointments.slots.map(appointment => {
              n++;
              const info = appointment
              info.month = appointments.m
              info.year = appointments.yr
              return <AvailableAppointment appointmentInfo={info} bookFunc={bookAppointment} key={n} />
          })

          const appDaySorted = []
          for(const appointment of appointments.slots){
            
            const day = appointment.d

            if(appDaySorted[day-1]){
              appDaySorted[day-1].push(appointment)
            } else {
              appDaySorted[day-1] = []
              appDaySorted[day-1].push(appointment)
            }
          }
          console.log('apds:',appDaySorted)
          setFAppointments(appDaySorted)

          console.log('react apds:',freeAppointments)

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
    client.subscribe(`${uID}/appointments`,{qos:sQos})
  }
}


  let [appointments, setAppointments] = useState([])

   isLoaded = true

    
  if(nonReactAppointments && !initLoad){
    setAppointments(nonReactAppointments)
    initLoad =true
  }
    
  update = (newAppointments, sAppoints) =>{
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
        
        <label>{bookingResponse}</label>
          <Popup trigger={bookingResponse} setTrigger={setBookingResp}>
        <p>Appointment successfully booked</p>
        </Popup>
        <Popup trigger={errBookingResponse} setTrigger={setErrBookingResp}> 
        <p>Appointment could not be booked!</p>
        </Popup>
      </div> 
      <div className="AList">
          {/* {appointments} */}
      </div>
      <Map zoom={10} center={{"lat":57.75,"lng":11.92}}  />
      <Calendar dayEntries={freeAppointments} bFunc={bFunc} />
    </div>
  )
};

export default Booking;