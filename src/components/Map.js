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

const onMessage = (message) => {
    try{
        const resJSON = JSON.parse(message.payloadString)
        clinics = resJSON
        let n = 0
        
        nonReactMarkers = clinics.dentists.map(marker => {
            n++;
            return <Marker lat={marker.coordinate.latitude} lng={marker.coordinate.longitude} key={n} icon={icon}/>
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
    
   isLoaded = true

    
    if(nonReactMarkers && !initLoad){
        setMarkers(nonReactMarkers)
        initLoad =true
    }
    

    update = (newMarkers) =>{
        setMarkers(newMarkers)
    }
    
    

    return (
        <div className="map">
            <GoogleMapReact bootstrapURLKeys={{key:""}} defaultCenter={center} defaultZoom={zoom}>
            {markers}
            </GoogleMapReact>
        </div>
    )
}

export default Map;
