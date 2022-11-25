import React from "react";
import "./BookAppointmentStyles.css";
import Appointment, { AppointmentBookingPreview } from "./Appointment";


export const BookAppointment = () =>{

  return (
 <div> 
  <p className="header">Available Appointments</p>
  <button className="invis"></button>   
  <div>
    <button className="Sort">Filter by</button>  
  </div> 
  <div className="AppointmentList table">
      <AppointmentBookingPreview />
      <AppointmentBookingPreview />
      <AppointmentBookingPreview />
      <AppointmentBookingPreview />
      
  </div>
 </div>
  )
};

export default BookAppointment;

