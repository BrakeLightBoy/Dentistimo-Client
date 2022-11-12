import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./components/Login";

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
    <>
      <Login />
    </>
  );
}

export default App;
