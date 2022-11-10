import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
const Paho = require('paho-mqtt')


const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const client = new Paho.Client(brokerHost,brokerPort,clientId)
const sQos = 2
const pQos = 2

client.onMessageArrived = onMessage;
client.connect({onSuccess: onConnect})





function onConnect () {
    console.log('CONN SUCC')
    client.subscribe('client1',{qos:sQos})
}

function onMessage(message){
    console.log(message)
}

function App() {
  const uname = useRef(null);
  const pass = useRef(null);

  const sendMQ = () =>{
    const payload = {operation: 'auth', username:uname.current.value, password:pass.current.value}
    const strPayload = JSON.stringify(payload)
    console.log(`common/${uname.current.value}`+ strPayload + pQos)
    client.publish(`common/${uname.current.value}`, strPayload,pQos)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input ref={uname} placeholder='Username'></input>
        <input ref={pass} placeholder='Password'></input>
      <button onClick={sendMQ}>Send Message</button>
      </header>
    </div>
  );
}

export default App;
