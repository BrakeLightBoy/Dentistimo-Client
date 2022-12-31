import React from "react";
import "./CalendarStyles.css";


const DayEntry = ({day, appointments}) => {
    
    return (appointments && appointments.length > 0) ? (
        <div>
            <div className="DayGrid">
            <div>Day {day}</div>
            </div>
            <div className="AppointmentBox">
                {appointments}
            </div>
        </div>
    ) : (
        <div>
            <div className="DayGrid">
            <button className="AppointmentDay">Day {day}</button>
            </div>
            <button className="AppointmentBox">
            <div>NO APPOINTMENTS</div>
            </button>
        </div>
    )
}

export default DayEntry