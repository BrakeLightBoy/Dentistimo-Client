import { Icon } from "@iconify/react";
import React from "react";

const Marker = ({icon, lat, lng, key, clinicName, clinicOwner, clinicAddress, clinicCity, clinicOpeningHours, clickFunc}) => {
    
    return (
        <div className="marker" onClick={() => {
            if(clickFunc){
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
                console.log(info)
            } else {
                console.log('no func')
            }
        }}>
            <Icon icon={icon} className='loc-mark' />
        </div>
    )
}


export default Marker;
