import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import DentistNavPanel from "../components/DentistNavPanel";
import Popup from "../components/Popup";

const engLang = require('../languages/english').navbar
const sweLang = require('../languages/swedish').navbar
let inUse = false
let chosenLang = localStorage.getItem('lang');


const Paho = require('paho-mqtt')

const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const client = new Paho.Client(brokerHost,brokerPort,clientId)
const sQos = 2
const pQos = 2

const uID = window.localStorage.getItem('uID')

client.connect({onSuccess: onConnect})

function onConnect () {
  console.log(uID)
  console.log('CONN SUCC LOGIN')
  client.subscribe(`${uID}/get-dentist`,{qos:sQos, onSuccess: () => {
    const payload = {operation: 'get-dentist', username: uID, opCat: 'dentist'}
    const strPayload = JSON.stringify(payload)
    client.publish(`common/${uID}`, strPayload,pQos)
  }})
}

export default function SettingsDentist() {
  const [dentistFName, setDentistFName] = useState("");
  const [dentistLName, setDentistLName] = useState("");
  const [dentistUsername, setDentistUsername] = useState("");
  const [dentistPassword, setDentistPassword] = useState("");
  const [dentistWork, setDentistWork] = useState("");
  const [dentistDaysOff, setDentistDaysOff] = useState("");
  const [dentistFika, setDentistFika] = useState("");
  const [dentistLunch, setDentistLunch] = useState("");
  

  const pass = useRef(null);
  const user = useRef(null);
  
  const [errorMsg, setErrorMsg] = useState(false);
  const [popupMsg, setPopupMsg] = useState('')

  function validateInfo() {
    setPopupMsg('')
    if (pass.current.value.length > 0 && pass.current.value.length < 5) {
      setPopupMsg('Password must be at least 5 characters long')
      setErrorMsg(true)
      return
    }
    if (pass.current.value.length ===  0 &&
        user.current.value.length === 0) {
      setPopupMsg('All fields are empty')
      setErrorMsg(true)
      return
    } 
    else saveInfo()
  }

  function saveInfo() {
    const payload = {
      operation: 'modify',
      opCat: 'dentist',
      id: uID,
      }
      if (user.current.value !== '') {
        payload.username = user.current.value
      }
      if (pass.current.value !== '') {
        payload.password = pass.current.value
      }
    const strPayload = JSON.stringify(payload)
    console.log(`common/${uID}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${uID}/#`,{qos:sQos, onSuccess: () => {
    client.publish(`common/${uID}`, strPayload,pQos)
  }}) 
  }

  const onMessage = (message) => {

    try{
      console.log(message)
      const resJSON = JSON.parse(message.payloadString)
      console.log('OP: ' + resJSON.operation)
      let dentist = resJSON.data
      console.log(resJSON.reason)
      switch(resJSON.operation){
      case 'get-dentist':
          setDentistFName(dentist.first_name)
          setDentistLName(dentist.last_name)
          setDentistUsername(dentist.username)
          setDentistWork(dentist.works_at)
          setDentistPassword(dentist.password)
          setDentistDaysOff(dentist.days_off)
          setDentistFika(dentist.fika_time)
          setDentistLunch(dentist.lunch_time)
          break;
      case 'modify':
        if (resJSON.reason === 'Username is already in use'){
          setPopupMsg('Username is already in use')
        } 
        else {
        setPopupMsg('Updated your info')
        }
        setErrorMsg(true)
        pass.current.value = null
        user.current.value = null
        break;
      default:
        break;
      }
    } catch(e){
        console.log(e)
    }
  }
  
  
    client.onMessageArrived = onMessage;
  
    const navigate = useNavigate();
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

      inUse = false
    }
  }
  
  checkLang()

  function toggleLang() {
    switch (chosenLang) {
      case 'eng':
        localStorage.setItem('lang','swe')
        chosenLang = 'swe'
        break;
      case 'swe':
        localStorage.setItem('lang','eng')
        chosenLang = 'eng'
        break;
      default:
        localStorage.setItem('lang','eng')
        chosenLang = 'eng'
        break;
    }
    checkLang()
  }

   return (
    <>
    <DentistNavPanel></DentistNavPanel>
    <Popup trigger={errorMsg} setTrigger={setErrorMsg}><p>{popupMsg}</p></Popup>
    <h1>Dentist Settings</h1>
    <div class = "settings-area">
    <div class="row">
      <div class="column1">
        <h2 class = "settings-h2">Name</h2>
        <p id="user-info">{dentistFName} {dentistLName}</p>
        <h2 class = "settings-h2">Fika time</h2>
        <p id="user-info">{dentistFika}</p>
        <h2 class = "settings-h2">Lunch time</h2>
        <p id="user-info">{dentistLunch}</p>
        <div>
          <a onClick={toggleLang} class="toggle-lang-btn steam-button">Language button: {pageLang}</a>
        </div>
      </div>
      <div class="column2">
        <p id="edit-details">Edit details</p>
        <h2 class = "settings-h2">Username</h2>
        <input ref={user} class = "settings-input" type="text" placeholder={dentistUsername}></input>
        <h2 class = "settings-h2">Password</h2>
        <input ref={pass} class = "settings-input" type="password" autocomplete="new-password"></input>
        <div>
          <button onClick={validateInfo} class=" save-btn steam-button">Save</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};
