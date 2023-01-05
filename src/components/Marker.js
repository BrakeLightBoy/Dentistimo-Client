import { Icon } from "@iconify/react";
import React from "react";

const Marker = ({icon, lat, lng, key, info, clickFunc, reqApp}) => {
    
    return (
        <div className="marker" onClick={() => {
            if(clickFunc){
                clickFunc(JSON.stringify(info))
                localStorage.setItem('clinicID', )
             if (!localStorage.getItem('savedYear') || !localStorage.getItem('savedMonth')){
                const date = new Date()
                localStorage.setItem('savedYear', date.getFullYear)
                localStorage.setItem('savedMonth', date.getMonth + 1)
             }
            reqApp()
                
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
