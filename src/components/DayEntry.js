import React from "react";
import "./CalendarStyles.css";


const DayEntry = ({day, appointments}) => {
    
    return (appointments && appointments.length > 0) ? (
        <div>
            <div>Day {day}</div>
            <div>
                {appointments}
            </div>
        </div>
    ) : (
        <div>
            <div>Day {day}</div>
            <div>NO APPOINTMENTS</div>
        </div>
    )
}

export default DayEntry