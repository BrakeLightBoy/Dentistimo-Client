import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";
import "./NavbarStyles.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 id="projName">PROJECT TITAN</h2>
      <h1>BOOK DENTISTS ALL OVER GOTHENBURG</h1>
      <div id="container">
        <div class="col deadcol"></div>
        <div class="col col-1">
          <p class="basicDesc">
            Seamless, easy to use, efficient. Just pick a preferred time and we
            will let you know what's available! Some more sample text to flesh
            out this description
          </p>
          <p class="basicDesc">
            "Inspirational relevant quote............" - Famous person
          </p>

          <div id="allBtns">
            <button
              id="loginBtn"
              class="steam-button"
              onClick={() => {
                navigate("/login");
              }}>
              Log In
            </button>

            <div class="buttonsDiv">
              <button class="steam-button">
                <a href="#learn-more">Learn More</a>
              </button>
              <button class="steam-button">
                <a href="#contact-us">Contact Us</a>
              </button>
            </div>

          </div>

        </div>
        <div class="col col-2">
          <img class="hp-img" src={placeholder} alt="blehhh" />
        </div>
        <div class="col deadcol"></div>
      </div>

      <div id="learn-more" class="hp-section">
        <h1>Learn More</h1>
      </div>

      <div id="contact-us" class="hp-section">
        <h1>Contact Us</h1>
      </div>

      <div id="footer">
        <h1>Footer</h1>
        <button class="steam-button">
          <a href="#projName">Back to Top</a>
        </button>
      </div>
    </>
  );
};

export default NavBar;
