import React, { useState } from "react";
import "./AppointmentStyles.css";

const engLang = require('../languages/english').availableappointments
const sweLang = require('../languages/swedish').availableappointments


const slotToString = (slot) => {

    const minutes = (slot % 2) ? '30' : '00'
    const hours = Math.floor(slot/2)
    const time = hours+":"+minutes

    // console.log('orgSlot:',slot)
    // console.log('time:',time)
    return time

}

const calcTimeStr = (slot) => {
    const s1 = slotToString(slot)
    const s2 = slotToString(slot+1)
    return s1+"-"+s2
}

const AvailableAppointment = ({appointmentInfo, bookFunc}) => {
    const info = appointmentInfo || {}
    const time =  calcTimeStr(info.s)
    const date = info.year+"-"+info.month+"-"+info.d

    const [dateNum, setDate] = useState(engLang.date);
    const [timeNum, setTime] = useState(engLang.time);
    const [book, setBook] = useState(engLang.book);

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
         setDate(langObj.date);
         setTime(langObj.time);
         setBook(langObj.book);
        }
    }

    checkLang()

    
    const f = () => {
        console.log('dat:',new Date(info.year+"-"+info.month+"-"+info.d))
        bookFunc(new Date(info.year+"-"+info.month+"-"+info.d+" "+slotToString(info.s)))
    }

    let bookAppointment = bookFunc || function(){}
    return (
        <div className="AABox">
            <div className="AAAtribs">
                <label className="AATime">{dateNum}: {date} </label>
                <label className="AATime">{timeNum}: {time} </label>
                <button onClick={f} className="AABtn">{book}</button>
            </div>
        </div>
    );
};

export default AvailableAppointment