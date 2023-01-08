import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import NavPanel from "../components/NavPanel";
import Popup from "../components/Popup";

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

export default function Settings() {
  const uID = window.localStorage.getItem('uID')
  
  const email = useRef(null);
  const first = useRef(null);
  const last = useRef(null);
  const pass = useRef(null);
  
  const [errorMsg, setErrorMsg] = useState(false);
  const [popupMsg, setPopupMsg] = useState('')

  function validateInfo() {
    setPopupMsg('')
    //Probably change popup to highlight the fields that are invalid and only show popup on successful changes
    /*if (!((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value))) && email.current.length > 0) {
      setPopupMsg('Invalid email format')
      setErrorMsg(true)
    }
    */
    if (pass.current.value.length > 0 && pass.current.value.length < 5) {
      setPopupMsg('Password must be at least 5 characters long')
      setErrorMsg(true)
      return
    }
    /*if (email.current.value.length > 0 ||
        pass.current.value.length > 0) {
      saveInfo()
      setPopupMsg('Updated your info')
      setErrorMsg(true)
      return
    }  
    */
    if (email.current.value.length === 0 &&
        pass.current.value.length ===  0) {
      setPopupMsg('All fields are empty')
      setErrorMsg(true)
      return
    } 
  }

  function saveInfo() {
    const payload = {
      operation: 'modify',
      opCat: 'user',
      id: uID,
      email_address: email.current.value,
      first_name: first.current.value,
      last_name: last.current.value,
      password: pass.current.value
      }
    const strPayload = JSON.stringify(payload)
    console.log(`common/${uID}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${uID}/#`,{qos:sQos, onSuccess: () => {
    client.publish(`common/${uID}`, strPayload,pQos)
  }})
  }


  return (
    <>
    <NavPanel></NavPanel>
    <Popup trigger={errorMsg} setTrigger={setErrorMsg}><p>{popupMsg}</p></Popup>
    <h1>Settings</h1>
    <h2>Email Address</h2>
    <input ref={email} type="text" placeholder="Email"></input>
    <h2>first name</h2>
    <input ref={first} type="text" placeholder="first name"></input>
    <h2>last name</h2>
    <input ref={last} type="text" placeholder="last name"></input>
    <h2>password</h2>
    <input ref={pass} type="text" placeholder="password"></input>
    <button onClick={validateInfo}>Save</button>
    </>
  );
};
