import React from "react";
import "./HeaderTableStyles.css";

const date = new Date();

let day = date.getDate();
let month = date.toLocaleString('default', { month: 'short' });
let year = date.getFullYear();

let CurrentDate = `${month} ${day}, ${year}`;

export function HeadTab() {
    return (
      <div className="header">
        <h3 className="text">Appointments</h3>
        <div className="right">
            <button className="today">{CurrentDate} Today</button>
        </div>
      </div>
    );
  };
  
  export default HeadTab;