import { Icon } from "@iconify/react";
import React from "react";

const Marker = ({icon, lat, lng, key, info, clickFunc}) => {
    
    return (
        <div className="marker" onClick={() => {
            if(clickFunc){
                clickFunc(JSON.stringify(info))
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
