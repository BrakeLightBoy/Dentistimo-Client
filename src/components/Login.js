import React from "react";
import "./LoginStyles.css";

export const Login = () => {

  return (
    <>
      <div class="form-box">
        <div class="button-box">
          <div id="btn"></div>
          <button class="toggle-btn" onClick={() => {
            document.getElementById("login").style.left = "50px";
            document.getElementById("register").style.left = "450px";
            document.getElementById("btn").style.left = "0px";
          }}>Login</button>

          <button class="toggle-btn" onClick={() => {
            document.getElementById("login").style.left = "-400px";
            document.getElementById("register").style.left = "50px";
            document.getElementById("btn").style.left = "110px";
          }}>Register</button>
        </div>
        
        <form id="login" class="input-group">
          <input type="text" class="input-field" placeholder="username"></input>
          <input type="text" class="input-field" placeholder="password"></input>
          <button type = "submit" class = "submit-btn">Log in</button>
        </form>

        <form id="register" class="input-group">
        <input type="text" class="input-field" placeholder="email"></input>
          <input type="text" class="input-field" placeholder="username"></input>
          <input type="text" class="input-field" placeholder="password"></input>
          <button type = "submit" class = "submit-btn">Register</button>
        </form>
      </div>
    </>
  );
};

export default Login;
