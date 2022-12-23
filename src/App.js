import {Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import MainPage from './routes/MainPage';
import Settings from './routes/Settings';
import SettingsDentist from "./routes/SettingsDentist";
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
            <Route path="/dentist" element={ <Dentist /> } />
            <Route path="/Settings" element={ <Settings /> } />
            <Route path="/SettingsDentist" element={ <SettingsDentist /> } />
            <Route path="/booking" element={ <Booking /> } />
          </Routes>
        </div>
      </div>
  );
}

export default App;
