import {Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./components/Login";
import MainPage from './routes/MainPage';
import BookAppointment from "./components/BookAppointment";
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
            <Route path="/BookAppointment" element={ <BookAppointment /> } />
          </Routes>
          </LoginProvider>
        </div>
      </div>
  );
}

export default App;
