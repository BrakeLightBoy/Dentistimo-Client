import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import NavPanel from "../components/NavPanel";


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
    <NavPanel></NavPanel>
    <h1>Settings</h1>
    <div class = "settings-area">
    <h2 class = "settings-h2">Email Address</h2>
    <input ref={email} class = "settings-input" type="text" placeholder="Email" autocomplete="new-password"></input>
    <h2 class = "settings-h2">first name</h2>
    <input ref={first} class = "settings-input" type="text" placeholder="first name" autocomplete="new-password"></input>
    <h2 class = "settings-h2">last name</h2>
    <input ref={last} class = "settings-input" type="text" placeholder="last name" autocomplete="new-password"></input>
    <h2 class = "settings-h2">password</h2>
    <input ref={pass} class = "settings-input" type="text" placeholder="password" autocomplete="new-password"></input>
    <div>
    <a onClick={toggleLang} class="toggle-lang-btn steam-button">Language Button: {pageLang}</a>
    </div>

    <div>
    <button onClick={saveInfo} class=" save-btn steam-button">Save</button>
    </div>
    </div>
    </>
  );
};
