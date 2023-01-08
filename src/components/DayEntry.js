import React from "react";
import "./CalendarStyles.css";


const DayEntry = ({day, appointments, monthDisplayed, yearDisplayed, isDummy}) => {
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.getMonth()+1
    const currentYear = currentDate.getFullYear()
    

    const displayFunction = () => {
        if(appointments && appointments.length > 0){
            if(monthDisplayed === currentMonth && yearDisplayed === currentYear && currentDay >= day) {
                return 'past'
            } else {
                return 'ok'
            }
        } else if(isDummy) {
            return 'dummy'
        } else{
            return 'booked'
        }
    }

    switch (displayFunction()) {
        case 'ok':
            return (
                <div>
                    <div className="DayGrid">
                        <div>Day {day}</div>
                    </div>
                    <div className="AppointmentBox">
                        {appointments}
                    </div>
                </div>
            )
        case 'dummy':
        case 'past':
        case 'booked':
            return(
                <div>
                    <div className="DayGrid">
                    <button className="AppointmentDay">Day {day}</button>
                    </div>
                    <button className="AppointmentBox">
                    <div>NO APPOINTMENTS</div>
                    </button>
                </div>
            )
        default:
            return(
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

    // return (displayFunction()) ? (
    //     <div>
    //         <div className="DayGrid">
    //         <div>Day {day}</div>
    //         </div>
    //         <div className="AppointmentBox">
    //             {appointments}
    //         </div>
    //     </div>
    // ) : (
    //     <div>
    //         <div className="DayGrid">
    //         <button className="AppointmentDay">Day {day}</button>
    //         </div>
    //         <button className="AppointmentBox">
    //         <div>NO APPOINTMENTS</div>
    //         </button>
    //     </div>
    // )
}

export default DayEntry