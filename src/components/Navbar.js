import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavbarStyles.css";
import video from "../assets/landing_page_vid_v9.mp4";
import noah from "../assets/noah.jpg";
import michael from "../assets/michael.JPG";
import woj from "../assets/woj.jpg";
import elisa from "../assets/elisa.JPG";
import john from "../assets/john.JPG";
import frida from "../assets/frida.JPG";
import emil from "../assets/emil.JPG";

const engLang = require('../languages/english').navbar
const sweLang = require('../languages/swedish').navbar

let inUse = false

const NavBar = () => {
  
  let chosenLang = localStorage.getItem('lang');

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
      <section className="showcase" id="top-page">
        <div className="video-container">
          <video src={video} autoPlay muted loop></video>
        </div>
        <div className="content">
          <h1>{title}</h1>
          <h2 id="projName">DENTISTIMO</h2>
          <a
            href="#about"
            className="steam-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            {loginButtonText}
          </a>

          <a href="#about" className="steam-button">
            {aboutButtonText}
          </a>
          
          <a href="#contact-us" className="steam-button">
            {contactText}
          </a>
        </div>
      </section>

      <section id="about">
        <h1>{aboutButtonText}</h1>
        <p className="basicDesc">
          {p1Text}
        </p>
        <p className="basicDesc">
          {p2Text}
        </p>
        <p className="basicDesc">
          {p3Text}
        </p>
        <p className="basicDesc">
          {p4Text}
        </p>
        <p className="basicDesc quote">
          {quoteText}
        </p>
        <p className="basicDesc">- Denis Waitley</p>
      </section>

      <section>
        <h1 id="contact-us">{contactText}</h1>
        <p className="basicDesc">
          {contactDescriptionText}
        </p>

        <div className="container">
          <div className="flex-item">
            <div className="pic">
              <img src={woj} alt="Wojciech" />
            </div>
            <div id="profile-name" className="title">
              Wojciech
            </div>
            <div className="desc">{fullStackText}</div>
          </div>

          <div className="flex-item">
            <div className="pic">
              <img src={noah} alt="Noah" />
            </div>
            <div id="profile-name" className="title">
              Noah
            </div>
            <div className="desc">{fullStackText}</div>
          </div>

          <div className="flex-item">
            <div className="pic">
              <img src={michael} alt="Michael" />
            </div>
            <div id="profile-name" className="title">
              Michael
            </div>
            <div className="desc">{fullStackText}</div>
          </div>
        </div>

        <div className="container">
          <div className="flex-item">
            <div className="pic">
              <img src={frida} alt="Frida" />
            </div>
            <div id="profile-name" className="title">
              Frida
            </div>
            <div className="desc">{frontendText}</div>
          </div>

          <div className="flex-item">
            <div className="pic">
              <img src={emil} alt="Emil" />
            </div>
            <div id="profile-name" className="title">
              Emil
            </div>
            <div className="desc">{frontendText}</div>
          </div>
        </div>

        <div className="container">
          <div className="flex-item">
            <div className="pic">
              <img src={elisa} alt="Elisa" />
            </div>
            <div id="profile-name" className="title">
              Elisa
            </div>
            <div className="desc">{backendText}</div>
          </div>

          <div className="flex-item">
            <div className="pic">
              <img src={john} alt="John" />
            </div>
            <div id="profile-name" className="title">
              John
            </div>
            <div className="desc">{backendText}</div>
          </div>
        </div>
      </section>
      <section id="about">
        <a href="#top-page" className="steam-button">
          {toTopText}
        </a>
      </section>
    </>
  );
};

export default NavBar;
