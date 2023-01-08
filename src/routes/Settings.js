import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SettingsStyles.css";
import NavPanel from "../components/NavPanel";
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
  console.log('CONN SUCC LOGIN')
  client.subscribe(`${uID}/get-user`,{qos:sQos, onSuccess: () => {
    const payload = {operation: 'get-user', personal_number: uID, opCat: 'user'}
    const strPayload = JSON.stringify(payload)
    client.publish(`common/${uID}`, strPayload,pQos)
  }})
}

export default function Settings() {
  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userPNum, setUserPNum] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const email = useRef(null);
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
    else saveInfo()
  }

  function saveInfo() {
    const payload = {
      operation: 'modify',
      opCat: 'user',
      id: uID,
    }
    if (email.current.value !== '') {
    payload.email_address = email.current.value
    }
    if (pass.current.value !== '') {
      payload.password = pass.current.value
    }

    const strPayload = JSON.stringify(payload)
    console.log(`common/${uID}`+ strPayload +' qos:'+ pQos)
    client.subscribe(`${uID}/#`,{qos:sQos, onSuccess: () => {
    console.log('saysomething')
    client.publish(`common/${uID}`, strPayload,pQos)
  }})
  }




const onMessage = (message) => {

  try{
    console.log(message)
    const resJSON = JSON.parse(message.payloadString)
    console.log('OP: ' + resJSON.operation)
    let user = resJSON.data
    switch(resJSON.operation){
      case 'get-user':
          setUserFName(user.first_name)
          setUserLName(user.last_name)
          setUserPNum(user.personal_number)
          setUserEmail(user.email_address)
          setUserPassword(user.password)
          break;  
      case 'modify':
        if (resJSON.reason === 'Email address already in use'){
          setPopupMsg("Email address already in use")
          setErrorMsg(true)
          break;
      } 
        else setPopupMsg('Updated your info')
        setErrorMsg(true)
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
    <NavPanel></NavPanel>
    <Popup trigger={errorMsg} setTrigger={setErrorMsg}><p>{popupMsg}</p></Popup>
    <h1>Settings</h1>
    <div class = "settings-area">
    <div class="row">
      <div class="column1">
        <h2 class = "settings-h2">First name</h2>
        <p id="user-info">{userFName}</p>
        <h2 class = "settings-h2">Last name</h2>
        <p id="user-info">{userLName}</p>
        <h2 class = "settings-h2">Personal number</h2>
        <p id="user-info">{userPNum}</p>
        <div>
          <a onClick={toggleLang} class="toggle-lang-btn steam-button">Language button: {pageLang}</a>
        </div>
      </div>
      <div class="column2">
        <p id="edit-details">Edit details</p>
        <h2 class = "settings-h2">Email address</h2>
        <input ref={email} class = "settings-input" type="text" placeholder={userEmail} autocomplete="new-password"></input>
        <h2 class = "settings-h2">Password</h2>
        <input ref={pass} class = "settings-input" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" autocomplete="new-password"></input>
        <div>
          <button onClick={validateInfo} class=" save-btn steam-button">Save</button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};
