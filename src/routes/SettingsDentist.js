import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import DentistNavPanel from "../components/DentistNavPanel";

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

export default function SettingsDentist() {
  const uID = window.localStorage.getItem('uID')
  
  const first = useRef(null);
  const last = useRef(null);
  const pass = useRef(null);
  const user = useRef(null);
  
  function saveInfo() {
    const payload = {
      operation: 'modify',
      opCat: 'dentist',
      id: uID,
      first_name: first.current.value,
      last_name: last.current.value,
      username: user.current.value,
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
    <DentistNavPanel></DentistNavPanel>
    <h1>Settings - Dentist</h1>
    <h2>first name</h2>
    <input ref={first} type="text" placeholder="first name"></input>
    <h2>last name</h2>
    <input ref={last} type="text" placeholder="last name"></input>

    <h2>username</h2>
    <input ref={user} type="text" placeholder="user name"></input>

    <h2>password</h2>
    <input ref={pass} type="text" placeholder="password"></input>
    <button onClick={saveInfo}>Save</button>
    </>
  );
};
