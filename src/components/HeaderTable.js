import React from "react";
import "./HeaderTableStyles.css";

export function HeadTab() {
    return (
      <div className="header">
        <h3 className="text">Appointments</h3>
        <div className="right">
            <button className="dateNav">Back</button>
            <button className="today">Today</button>
            <button className="dateNav">Forward</button>
        </div>
      </div>
    );
  };
  
  export default HeadTab;