import React from "react";
import AvailableAppointment from "./AvailableAppointment";
import "./CalendarStyles.css";
import DayEntry from "./DayEntry";

import { useState, useRef } from "react";

const engLang = require('../languages/english').bookings
const sweLang = require('../languages/swedish').bookings


const Calendar = ({dayEntries, bFunc, reqApp}) => {
    const [previousButton, setPreviousButton] = useState(engLang.previousButton);
    const [nextButton, setNextButton] = useState(engLang.nextButton);
  
    
    let displayDate = null
    if (!localStorage.getItem('savedYear') || !localStorage.getItem('savedMonth')){
        const date = new Date()
        localStorage.setItem('savedYear', date.getFullYear())
        localStorage.setItem('savedMonth', date.getMonth() + 1)
     }
    displayDate = localStorage.getItem('savedMonth') + " / " + localStorage.getItem('savedYear')
    
    const month = parseInt(localStorage.getItem('savedMonth')) 
    const year = parseInt(localStorage.getItem('savedYear'))
    const curDate = new Date(year,month,0)
    const daysInCMonth = curDate.getDate()

    const createDummies = () => {
        const dummies = []
        for (let i=0; i<daysInCMonth; i++){
            dummies[i] = <DayEntry key={i+1} day={i+1}> isDummy={true} </DayEntry>
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



                const dayEntry = <DayEntry key={i+1} day={i+1} appointments={dayAppoints} monthDisplayed={month} yearDisplayed={year} />
                dayEntries[i] = dayEntry
            }
        }

        return dayEntries
    }

    const days = (dayEntries && dayEntries.length > 0) ? processEntries(dayEntries) : createDummies()

    

    //Buttons turn darker on mouse over
      const onMouseOver = event => {
        const el = event.target;
      };
      
      const onMouseOut = event => {
        const el = event.target;
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
        const currentDate = new Date()
        const cMonth = currentDate.getMonth() +1
        const cYear = currentDate.getFullYear()

        
        let currentMonth = localStorage.getItem('savedMonth')
        let currentYear = localStorage.getItem('savedYear')
        let intYear = parseInt(currentYear)
        let intMonth = parseInt(currentMonth)


        if(cMonth === intMonth && cYear === intYear){
            //ignored since this month is the latest
        } else {
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


       
    }

    function returnToNow(){
        const date = new Date()
        localStorage.setItem('savedYear', date.getFullYear())
        localStorage.setItem('savedMonth', date.getMonth() + 1)
        reqApp()
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
       setNextButton(langObj.nextButton);
       setPreviousButton(langObj.previousButton);
      }
  }

  checkLang()
    
    return (
        <div>
            <div className="WeekGrid" id="BigGrid">
                <button className="leftArrow Arrow"
                onClick={() => {
                    lastMonth()
                  }}
                  onMouseEnter={event => onMouseOver(event)}
                  onMouseOut={event => onMouseOut(event)}>{previousButton}</button> 
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
                >{nextButton}</button> 
            </div> 
            <div className="AppointmentGrid" id="AppointmentGrid">
                {days}
            </div>   
        </div>
    )
    
    
}



export default Calendar