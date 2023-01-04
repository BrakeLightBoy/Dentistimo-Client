import React from "react";
//import "./HeaderTableStyles.css";

export function HeadTab() {
    return (
      <div className="header">
        <div className="text">
            <h3>Appointments</h3>
        </div>
        <div className="right">
            <div className="date">
                <button className="dateNav">Back</button>
                <button className="today"> CurrentDate </button>
                <button className="dateNav">Forward</button>
            </div>
            <button className="fika">Schedule fika break</button>
        </div>
      </div>
    );
  };
  
  export default HeadTab;