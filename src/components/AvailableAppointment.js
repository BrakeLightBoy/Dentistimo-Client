import React from "react";
import "./AppointmentStyles.css";

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
    
    
    const f = () => {
        console.log('dat:',new Date(info.year+"-"+info.month+"-"+info.d))
        bookFunc(new Date(info.year+"-"+info.month+"-"+info.d+" "+slotToString(info.s)))
    }

    let bookAppointment = bookFunc || function(){}
    return (
        <div className="AABox">
            <div className="AAAtribs">
                <label className="AATime">Date: {date} </label>
                <label className="AATime">Time: {time} </label>
                <button onClick={f} className="AABtn">Book</button>
            </div>
        </div>
    );
};

export default AvailableAppointment