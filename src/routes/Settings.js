import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import NavPanel from "../components/NavPanel";
import LoginContext from "../contexts/LoginContext";

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
  const { userNum } = useContext(LoginContext);
  
  const email = useRef(null);
  const first = useRef(null);
  const last = useRef(null);
  const pass = useRef(null);
  
  function saveInfo() {
    const payload = {
      operation: 'modify',
      opCat: 'user',
      id: '0000000000',
      email_address: email.current.value,
      first_name: first.current.value,
      last_name: last.current.value,
      password: pass.current.value
      }
    const strPayload = JSON.stringify(payload)
    console.log(`common/0000000000`+ strPayload +' qos:'+ pQos)
    client.subscribe(`0000000000/#`,{qos:sQos, onSuccess: () => {
    client.publish(`common/0000000000`, strPayload,pQos)
  }}) 
  }


  return (
    <>
    <NavPanel></NavPanel>
    <h1>Settings</h1>
    <h2>Email Address</h2>
    <input ref={email} type="text" placeholder="Email"></input>
    <h2>first name</h2>
    <input ref={first} type="text" placeholder="first name"></input>
    <h2>last name</h2>
    <input ref={last} type="text" placeholder="last name"></input>
    <h2>password</h2>
    <input ref={pass} type="text" placeholder="password"></input>
    <button onClick={saveInfo}>Save</button>
    </>
  );
};
