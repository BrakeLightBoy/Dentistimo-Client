import React from "react";
import "./CalendarStyles.css";
import {useState} from "react";

const engLang = require('../languages/english').bookings
const sweLang = require('../languages/swedish').bookings


const DayEntry = ({day, appointments, monthDisplayed, yearDisplayed, isDummy}) => {
    const [dayTitle, setDayTitle] = useState (engLang.dayTitle);
    const [noAppointment, setNoAppointnment] = useState(engLang.noAppointments);

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
       setDayTitle(langObj.dayTitle);
       setNoAppointnment(langObj.noAppointments);
      }
  }

  checkLang()

    switch (displayFunction()) {
        case 'ok':
            return (
                <div>
                    <div className="DayGrid">
                        <div>{dayTitle} {day}</div>
                    </div>
                    <div>
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
                    <button className="AppointmentDay">{dayTitle} {day}</button>
                    </div>
                    <button className="AppointmentBox">
                    <div>{noAppointment}</div>
                    </button>
                </div>
            )
        default:
            return(
                <div>
                    <div className="DayGrid">
                    <button className="AppointmentDay">{dayTitle} {day}</button>
                    </div>
                    <button className="AppointmentBox">
                    <div>{noAppointment}</div>
                    </button>
                </div>
            )
    }
}

export default DayEntry