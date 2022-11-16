import { Icon } from "@iconify/react";


const Marker = ({icon, lat, lng, onClick, key}) => {
    
    return (
        <div className="marker" onClick={onClick}>
            <Icon icon={icon} className='loc-mark' />
        </div>
    )
}


export default Marker;
