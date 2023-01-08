import React from "react";
import AvailableAppointment from "./AvailableAppointment";
import "./CalendarStyles.css";
import DayEntry from "./DayEntry";




const Calendar = ({dayEntries, bFunc, reqApp}) => {
    
    let displayDate = null
    if (!localStorage.getItem('savedYear') || !localStorage.getItem('savedMonth')){
        const date = new Date()
        localStorage.setItem('savedYear', date.getFullYear())
        localStorage.setItem('savedMonth', date.getMonth() + 1)
     }
    displayDate = localStorage.getItem('savedMonth') + " / " + localStorage.getItem('savedYear')
    
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

        return dayEntries
    }

    const days = (dayEntries && dayEntries.length > 0) ? processEntries(dayEntries) : createDummies()

    

    //Buttons turn darker on mouse over
      const onMouseOver = event => {
        const el = event.target;
        el.style.background = "rgb(42, 98, 144)";
      };
      
      const onMouseOut = event => {
        const el = event.target;
        el.style.background = "rgb(42, 113, 168)";
      };

      
      

      function nextMonth() {
        let currentMonth = localStorage.getItem('savedMonth')
        let currentYear = localStorage.getItem('savedYear')
        let intYear = parseInt(currentYear)
        let intMonth = parseInt(currentMonth)
        if (intMonth === 12){
            localStorage.setItem('savedMonth', 1)
            intYear++
            localStorage.setItem('savedYear', intYear)
        }else{
            intMonth++
            localStorage.setItem('savedMonth', intMonth)
        }
        reqApp() 
        displayDate = toString(intMonth) + " / " + toString(intYear)  
    }

    function lastMonth() {
        let currentMonth = localStorage.getItem('savedMonth')
        let currentYear = localStorage.getItem('savedYear')
        let intYear = parseInt(currentYear)
        let intMonth = parseInt(currentMonth)
        if (intMonth === 1){
            localStorage.setItem('savedMonth', 12)
            intYear--
            localStorage.setItem('savedYear', intYear)
        }else{
            intMonth--
            localStorage.setItem('savedMonth', intMonth)
        }     
        reqApp()
        displayDate = toString(intMonth) + " / " + toString(intYear)
    }

    function returnToNow(){
        const date = new Date()
        localStorage.setItem('savedYear', date.getFullYear())
        localStorage.setItem('savedMonth', date.getMonth() + 1)
        reqApp()
    }
    
    return (
        <div>
            <p className="header2">Available Appointments</p> 
            <div className="WeekGrid" id="BigGrid">
                <button className="leftArrow Arrow"
                onClick={() => {
                    lastMonth()
                  }}
                  onMouseEnter={event => onMouseOver(event)}
                  onMouseOut={event => onMouseOut(event)}>Previous</button> 
                <button className="currentDate" 
                onClick={() => {
                    returnToNow()
                  }}
                  onMouseEnter={event => onMouseOver(event)}
                  onMouseOut={event => onMouseOut(event)}
                > {displayDate}</button> 
                <button className="RightArrow Arrow"
                onClick={() => {
                    nextMonth()
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