import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import DentistNavPanel from "../components/DentistNavPanel";

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
  
  function saveInfo() {
    const payload = {
      operation: 'modify',
      opCat: 'dentist',
      id: uID,
      username: user.current.value,
      password: pass.current.value
      }
    const strPayload = JSON.stringify(payload)
    console.log(`common/${uID}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${uID}/#`,{qos:sQos, onSuccess: () => {
    client.publish(`common/${uID}`, strPayload,pQos)
  }}) 
  }

const onMessage = (message) => {

  try{
    const resJSON = JSON.parse(message.payloadString)
    console.log('OP: ' + resJSON.operation)
    switch(resJSON.operation){
      case 'get-dentist':
          let dentist = resJSON.data
          setDentistFName(dentist.first_name)
          setDentistLName(dentist.last_name)
          setDentistUsername(dentist.username)
          setDentistWork(dentist.works_at)
          setDentistPassword(dentist.password)
          setDentistDaysOff(dentist.days_off)
          setDentistFika(dentist.fika_time)
          setDentistLunch(dentist.lunch_time)
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
  
  const [title, setTitle] = useState(engLang.title);
  const [loginButtonText, setLoginButtonText] = useState(engLang.loginButtonText);
  const [aboutButtonText, setAboutButtonText] = useState(engLang.aboutButtonText);
  const [contactText, setContactText] = useState(engLang.contactText);
  const [p1Text, setp1Text] = useState(engLang.p1Text);
  const [p2Text, setp2Text] = useState(engLang.p2Text);
  const [p3Text, setp3Text] = useState(engLang.p3Text);
  const [p4Text, setp4Text] = useState(engLang.p4Text);
  const [quoteText, setQuoteText] = useState(engLang.quoteText);
  const [contactDescriptionText, setContactDescriptionText] = useState(engLang.contactDescriptionText);
  const [fullStackText, setFullStackText] = useState(engLang.fullStackText);
  const [backendText, setBackendText] = useState(engLang.backendText);
  const [frontendText, setFrontendText] = useState(engLang.frontendText);
  const [toTopText, setToTopText] = useState(engLang.toTopText);
  

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

      setTitle(langObj.title);
      setLoginButtonText(langObj.loginButtonText);
      setAboutButtonText(langObj.aboutButtonText);
      setContactText(langObj.contactText);
      setp1Text(langObj.p1Text);
      setp2Text(langObj.p2Text);
      setp3Text(langObj.p3Text);
      setp4Text(langObj.p4Text);
      setQuoteText(langObj.quoteText);
      setContactDescriptionText(langObj.contactDescriptionText);
      setFullStackText(langObj.fullStackText);
      setBackendText(langObj.backendText);
      setFrontendText(langObj.frontendText);
      setToTopText(langObj.toTopText);
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
        <input ref={user} class = "settings-input" type="text" placeholder={dentistUsername} autocomplete="new-password"></input>
        <h2 class = "settings-h2">Password</h2>
        <input ref={pass} class = "settings-input" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autocomplete="new-password"></input>
        <div>
          <button onClick={saveInfo} class=" save-btn steam-button">Save</button>
        </div>
      </div>
    </div>
    </div>

  
    </>
  );
};
