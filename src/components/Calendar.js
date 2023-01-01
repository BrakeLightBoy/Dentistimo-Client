import React from "react";
import AvailableAppointment from "./AvailableAppointment";
import "./CalendarStyles.css";
import DayEntry from "./DayEntry";

const Calendar = ({dayEntries, bFunc}) => {

    const createDummies = () => {
        const dummies = []
        for (let i=0; i<31; i++){
            dummies[i] = <DayEntry key={i+1} day={i+1}></DayEntry>
        }
        return dummies
    }

    const processEntries = (entries) => {
        const dayEntries = createDummies()


        for(let i=0; i<31; i++){
            if(entries[i]){
                const dayAppoints = []
                let n =0
                for(const availAppoint of entries[i]){
                    n++
                    const appointment = <AvailableAppointment key={n} appointmentInfo={availAppoint} bookFunc={bFunc} />

                    dayAppoints.push(appointment)
                }
                const dayEntry = <DayEntry key={i+1} day={i+1} appointments={dayAppoints} />
                dayEntries[i] = dayEntry
            }
        }

        console.log('mapped entries:',dayEntries)

        return dayEntries
    }

    const days = (dayEntries && dayEntries.length > 0) ? processEntries(dayEntries) : createDummies()

    const onMouseOver = event => {
        const el = event.target;
        el.style.background = "rgb(42, 98, 144)";
      };
      
      const onMouseOut = event => {
        const el = event.target;
        el.style.background = "rgb(42, 113, 168)";
      };
    
    return (
        <div>
            <p className="header">Available Appointments</p> 
            <div className="WeekGrid" id="BigGrid">
                <button className="leftArrow Arrow"
                onClick={() => {
                    document.getElementById("AppointmentGrid").style.marginLeft = "0.5rem";
                  }}
                  onMouseEnter={event => onMouseOver(event)}
                  onMouseOut={event => onMouseOut(event)}>Previous</button> 
                <button className="currentDate">12 / 2022</button>  
                <button className="RightArrow Arrow"
                onClick={() => {
                    document.getElementById("AppointmentGrid").style.marginLeft = "-100rem";
                  }}
                  onMouseEnter={event => onMouseOver(event)}
                  onMouseOut={event => onMouseOut(event)}
                >Next</button> 
            </div> 
            <div className="AppointmentGrid" id="AppointmentGrid">
                {days}
            </div>   
        </div>
    )
}



export default Calendar