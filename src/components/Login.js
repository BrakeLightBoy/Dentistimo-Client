import React from "react";
import "./LoginStyles.css";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Popup from "./Popup";
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

const Paho = require('paho-mqtt')


const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const client = new Paho.Client(brokerHost,brokerPort,clientId)
const sQos = 2
const pQos = 2

let isDoctor = false

client.connect({onSuccess: onConnect})



function onConnect () {
    console.log('CONN SUCC LOGIN')
}



export const Login = () => {
  const logPnum = useRef(null);
  const logPass = useRef(null);
  const logDoct = useRef(null);
  
  const regPnum = useRef(null);
  const regPass = useRef(null);
  const regFname = useRef(null);
  const regLname = useRef(null);
  const regMail = useRef(null);
 
  const [regResponse, setRegResp] = useState(false);
  const [errRegResponse, setErrRegResp] = useState(false);
  const [logResponse, setLogResp] = useState(false);
  const [emptyResponse, setEmptyResponse] = useState(false);
  const [uidTextbox, setTextbox] = useState("Personal Number");
  const {userLogin} = useContext(LoginContext);
  



  const navigate = useNavigate();
  

  const onMessage = (message) => {
    console.log(message)
    
    try{
      const resJSON = JSON.parse(message.payloadString)
      switch(resJSON.operation) {
        case 'login':
          if(resJSON.success){
            navigate('/mainpage')
          } else {
            setLogResp(true);
          }
          break;
        case 'dentist-login':
          if(resJSON.success){
            navigate('/dentist')
          } else {
            setLogResp(true);
          }
          break;
        case 'register':
          if(resJSON.success){
            setRegResp(true);
            regPnum.current.value = ""
            regPass.current.value = ""
            regFname.current.value = ""
            regLname.current.value = ""
            regMail.current.value = ""
          } else {
            setErrRegResp(true);
          }
          break;
        default:
      }
    } catch(e) {
      console.log(e)
    }
}

client.onMessageArrived = onMessage;

const login = () =>{
  const dentistCheck = document.getElementsByClassName("checkbox")
  if(logPnum.current.value === "" || logPass.current.value === ""){
    setEmptyResponse(true);
  } else if(isDoctor) {
    const payload = {operation: 'login', username:logPnum.current.value, password:logPass.current.value, opCat: 'dentist'}
    const strPayload = JSON.stringify(payload)
    console.log(`common/${logPnum.current.value}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${logPnum.current.value}/#`,{qos:sQos, onSuccess: () => {
    console.log('log subbed')
    client.publish(`common/${logPnum.current.value}`, strPayload,pQos)
    userLogin(logPnum.current.value);
    }})
  } else {
    const payload = {operation: 'login', personal_number:logPnum.current.value, password:logPass.current.value, opCat: 'user'}
    const strPayload = JSON.stringify(payload)
    console.log(`common/${logPnum.current.value}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${logPnum.current.value}/#`,{qos:sQos, onSuccess: () => {
    console.log('log subbed')
    client.publish(`common/${logPnum.current.value}`, strPayload,pQos)
    userLogin(logPnum.current.value);
  }}) 
  }
  
}
  
  const register = () =>{
    if(regPnum.current.value === "" || regPass.current.value === "" || regFname.current.value === "" || regLname.current.value === "" || regMail.current.value === ""){
      setEmptyResponse(true);
    } else {
      const payload = {
      operation: 'register',
      opCat: 'user',
      personal_number: regPnum.current.value,
      password: regPass.current.value,
      first_name: regFname.current.value,
      last_name: regLname.current.value,
      email_address: regMail.current.value
    }
    const strPayload = JSON.stringify(payload)
    console.log(`common/${regPnum.current.value}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${regPnum.current.value}/#`,{qos:sQos, onSuccess: () => {
      console.log('reg subbed')
      client.publish(`common/${regPnum.current.value}`, strPayload,pQos)
    }})
    }
    
  }

  

  const toggleDoctor = () => {
    if(isDoctor){
      isDoctor = false
      setTextbox("Personal Number")
    } else {
      isDoctor = true
      setTextbox("Username")
    }
  }

  return (
    <>
      <div className="form-box">
        <div className="button-box">
          <div id="btn"></div>
          <button
            className="toggle-btn"
            onClick={() => {
              document.getElementById("login").style.left = "3.3rem";
              document.getElementById("register").style.left = "29rem";
              document.getElementById("btn").style.left = "0px";
            }}
          >
            Login
          </button>

          <button
            className="toggle-btn"
            onClick={() => {
              document.getElementById("login").style.left = "-25rem";
              document.getElementById("register").style.left = "3.4rem";
              document.getElementById("btn").style.left = "7rem";
            }}
          >
            Register
          </button>
        </div>

        <form id="login" onSubmit={(event) => { event.preventDefault()}} className="input-group">
          <Popup trigger={logResponse} setTrigger={setLogResp}> 
            <h4>Uh oh!</h4>
            <p>Wrong personal number or password</p>
          </Popup>
          <Popup trigger={emptyResponse} setTrigger={setEmptyResponse}> 
            <p>No input field can be blank</p>
          </Popup>
          <input ref={logPnum} type="text" className="input-field" placeholder={uidTextbox}></input>
          <input ref={logPass} type="text" className="input-field" placeholder="Password"></input>
          <input ref={logDoct} type="checkbox" className="checkbox" value="doctor" onClick={toggleDoctor}></input>
          <label> Doctor</label>
          <button type="submit" className="submit-btn" onClick={login}>
            Log in
          </button>
        </form>

        <form id="register" onSubmit={(event) => { event.preventDefault()}} className="input-group">
          <label>{regResponse}</label>
          <Popup trigger={regResponse} setTrigger={setRegResp}> 
            <p>Account successfully created</p>
          </Popup>
          <Popup trigger={errRegResponse} setTrigger={setErrRegResp}> 
            <p>Registration failed</p>
          </Popup>
          <Popup trigger={emptyResponse} setTrigger={setEmptyResponse}> 
            <p>No input field can be blank</p>
          </Popup>
          <input ref={regPnum} type="text" className="input-field" placeholder="Personal Number"></input>
          <input ref={regPass} type="text" className="input-field" placeholder="Password"></input>
          <input ref={regFname} type="text" className="input-field" placeholder="First Name"></input>
          <input ref={regLname} type="text" className="input-field" placeholder="Last Name"></input>
          <input ref={regMail} type="text" className="input-field" placeholder="Email"></input>
          <button type="submit" className="submit-btn" onClick={register}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
