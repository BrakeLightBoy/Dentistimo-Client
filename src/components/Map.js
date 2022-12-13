import {useState} from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import icon from '@iconify/icons-mdi/map-marker'
const Paho = require('paho-mqtt')


const brokerHost = 'localhost'
const brokerPort = 9001
const clientId = ""

const client = new Paho.Client(brokerHost,brokerPort,clientId)
const sQos = 2


client.connect({onSuccess: onConnect})
let clinics = null
let isLoaded = false
let nonReactMarkers = null

let initLoad = false

let update = null
let displayInfo = null

const onMessage = (message) => {
    try{
        const resJSON = JSON.parse(message.payloadString)
        clinics = resJSON
        console.log(clinics)
        let n = 0
        
        nonReactMarkers = clinics.map(marker => {
            n++;
            const info = marker
            return <Marker lat={marker.coordinate.latitude} clickFunc={displayInfo} lng={marker.coordinate.longitude} info={info} key={n} icon={icon}/>
        })

        if(isLoaded){
            update(nonReactMarkers)
        } 
        

    } catch(e){
        console.log(e)
    }
}

client.onMessageArrived = onMessage;

function onConnect () {
    client.subscribe(`clinics`,{qos:sQos, onSuccess: () => {
        console.log('clinics subbed')
    }})
}

const Map = ({center, zoom}) =>{
    
    let [markers, setMarkers] = useState([])
    let [info, setInfo] = useState("")

   isLoaded = true

    
    if(nonReactMarkers && !initLoad){
        setMarkers(nonReactMarkers)
        initLoad =true
    }
    

    update = (newMarkers) =>{
        setMarkers(newMarkers)
    }
    
    displayInfo = setInfo

    return (
        <div className="map">
            <GoogleMapReact bootstrapURLKeys={{key:""}} defaultCenter={center} defaultZoom={zoom}>
            {markers}
            </GoogleMapReact>
            <label>Clinic Info: {info}</label>
        </div>
       
    )
}

export default Map;
