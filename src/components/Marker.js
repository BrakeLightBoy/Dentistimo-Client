import { Icon } from "@iconify/react";
import React from "react";

const Marker = ({icon, lat, lng, key, clinic_ID, clinicName, clinicOwner, clinicAddress, clinicCity, clinicOpeningHours, clickFunc, reqApp}) => {

    return (
        <div className="marker" onClick={() => {
            if(clickFunc){
                const clinicID = clinic_ID
                    localStorage.setItem('savedClinic', clinicID)
                if (!localStorage.getItem('savedYear') || !localStorage.getItem('savedMonth')){
                    const date = new Date()
                    localStorage.setItem('savedYear', date.getFullYear())
                    localStorage.setItem('savedMonth', date.getMonth() + 1)
                }
            
                var info = {}
                info.name = clinicName
                info.owner = clinicOwner
                info.address = clinicAddress
                info.city = clinicCity
                info.monday = clinicOpeningHours.monday
                info.tuesday = clinicOpeningHours.tuesday
                info.wednesday = clinicOpeningHours.wednesday
                info.thursday = clinicOpeningHours.thursday
                info.friday = clinicOpeningHours.friday
                
                clickFunc(info)
                reqApp()

            } 
        }}>
            <Icon icon={icon} className='loc-mark' />
        </div>
    )
}


export default Marker;
