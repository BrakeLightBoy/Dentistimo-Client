import {Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./components/Login";
import MainPage from './routes/MainPage'

function App() {
  return (
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/mainpage" element={ <MainPage /> } />
          </Routes>
        </div>
      </div>
  );
}

export default App;
