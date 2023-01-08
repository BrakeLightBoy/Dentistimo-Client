import {useState} from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import icon from '@iconify/icons-mdi/map-marker'
import "./MapStyles.css";

const engLang = require('../languages/english').bookings
const sweLang = require('../languages/swedish').bookings

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
let displayCalendar = null
let markerReqApp = null


function onConnect () {
    client.subscribe(`clinics`,{qos:sQos})
}

const Map = ({center, zoom, marker, reqApp}) =>{
    const [ownerTitle, setOwnerTitle] = useState(engLang.ownerTitle);
    const [openingTitle, setOpeningTitle] = useState(engLang.openingTitle);
    const [monday, setMonday] = useState(engLang.monday);
    const [tuesday, setTuesday] = useState(engLang.tuesday);
    const [wednesday, setWednesday] = useState(engLang.wednesday);
    const [thursday, setThursday] = useState(engLang.thursday);
    const [friday, setFriday] = useState(engLang.friday);
    const [address, setAddress] = useState(engLang.address);
    const [city, setCity] = useState (engLang.city);

    
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

    const onMessage = (message) => {
        try{
            const resJSON = JSON.parse(message.payloadString)
            clinics = resJSON
            let n = 0
            
            nonReactMarkers = clinics.map(marker => {
                n++;
                let info = marker                

                return <Marker lat={marker.coordinate.latitude} clickFunc={displayInfo} lng={marker.coordinate.longitude} clinic_ID={info._id} clinicName={info.name} clinicOwner={info.owner} clinicAddress={info.address} clinicCity={info.city} clinicOpeningHours={info.opening_hours} key={n} icon={icon} reqApp={markerReqApp}/>
            })
    
            if(isLoaded){
                update(nonReactMarkers)
            } 
            
    
        } catch(e){
        }
    }
    client.onMessageArrived = onMessage;
        
    displayInfo = setInfo
    markerReqApp = reqApp

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
       setOwnerTitle(langObj.ownerTitle);
       setOpeningTitle(langObj.openingTitle);
       setMonday(langObj.monday);
       setTuesday(langObj.tuesday);
       setWednesday(langObj.wednesday);
       setThursday(langObj.thursday);
       setFriday(langObj.friday);
       setAddress(langObj.address);
       setCity(langObj.city);
      }
  }

  checkLang()

    return (
        <div class="row">
            <div class="map-column">
                <div className="map">
                <GoogleMapReact bootstrapURLKeys={{key:""}} defaultCenter={center} defaultZoom={zoom}>
                {markers}
                </GoogleMapReact>
                </div>
            </div>
            <div class="info-column">
                <div id="info">
                <p id="info-text1">{info.name}</p>
                <p id="info-text">{ownerTitle}:  <b>{info.owner}</b></p>
                <p id="info-text">{openingTitle}:  <br/>
                <table width="100%" cellspacing="0" cellpadding="0" border="0"><b>
                    <tr align="center">
                        <td align="left" width="180">{monday}</td>
                        <td align="right">{info.monday}</td>
                    </tr>
                    <tr align="center">
                        <td align="left" width="180">{tuesday}</td>
                        <td align="right">{info.tuesday}</td>
                    </tr>
                    <tr align="center">
                        <td align="left" width="180">{wednesday}</td>
                        <td align="right">{info.wednesday}</td>
                    </tr>
                    <tr align="center">
                        <td align="left" width="180">{thursday}</td>
                        <td align="right">{info.thursday}</td>
                    </tr>
                    <tr align="center">
                        <td align="left" width="180">{friday}</td>
                        <td align="right">{info.friday}</td>
                    </tr>
                </b></table>
                </p>
                <p id="info-text">{address}:  <b>{info.address}</b></p>
                <p id="info-text">{city}: <b>{info.city}</b></p>
                </div>
            </div>
        </div>
       
    )
}

export default Map;
