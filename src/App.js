import {Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import MainPage from './routes/MainPage';
import Booking from "./routes/Booking";
import Dentist from "./routes/DentistPage";

function App() {
  return (
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/mainpage" element={ <MainPage /> } />
            <Route path="/booking" element={ <Booking /> } />
            <Route path="/dentist" element={ <Dentist />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
