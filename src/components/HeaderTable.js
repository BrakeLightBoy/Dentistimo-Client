import React from "react";
import "./HeaderTableStyles.css";
import { useState } from "react";

const date = new Date();

const engLang = require('../languages/english').mainpage
const sweLang = require('../languages/swedish').mainpage

let day = date.getDate();
let month = date.toLocaleString('default', { month: 'short' });
let year = date.getFullYear();

let CurrentDate = `${month} ${day}, ${year}`;

export function HeadTab() {
  const [pageTitle, setPageTitle] = useState(engLang.pageTitle);

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
      setPageTitle(langObj.pageTitle);
    }
  }

  checkLang()

    return (
      <div className="header">
        <h3 className="text">{pageTitle}</h3>
        <div className="right">
            <button className="today">{CurrentDate} Today</button>
        </div>
      </div>
    );
  };
  
  export default HeadTab;