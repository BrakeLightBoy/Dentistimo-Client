import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavPanelStyles.css";
import { useState, useRef } from "react";


const engLang = require('../languages/english').navpanel
const sweLang = require('../languages/swedish').navpanel

const DentistNavPanel = () => {
  const [homeTitle, setHomeTitle] = useState(engLang.home);
  const [settingsTitle, setSettingsTitle] = useState(engLang.settings);
  const [logOut, setLogOut] = useState(engLang.logOut);

  function clearStorage () {
    const lang = window.localStorage.getItem('lang');
    window.localStorage.clear();
    window.localStorage.setItem('lang', lang);
}

  const chosenLang = localStorage.getItem('lang');
  const [pageLang, setLang] = useState('eng'); 

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
       setHomeTitle(langObj.home);
       setSettingsTitle(langObj.settings);
       setLogOut(langObj.logOut);
      }
  }

  checkLang()

  return (
    <nav class="nav">
      <a href="/" class="nav-title">
        DENTISTIMO
      </a>
      <ul>

        <li>
          <a href="/dentist">{homeTitle}</a>
        </li>


        <li>
          <a href="/SettingsDentist">{settingsTitle}</a>
        </li>
        <li>
          <a href="/" onClick={clearStorage}>{logOut}</a>
        </li>

      </ul>
    
    </nav>
  );
};

export default DentistNavPanel;
