import {Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./components/Login";
import MainPage from './routes/MainPage';
import DentistPage from './routes/DentistPage';
import { LoginProvider } from './contexts/LoginContext';

function App() {
  return (
      <div className="App">
        <div className="content">
        <LoginProvider>
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/mainpage" element={ <MainPage /> } />
            <Route path="/dentist" element={ <DentistPage /> } />
          </Routes>
          </LoginProvider>
        </div>
      </div>
  );
}

export default App;
