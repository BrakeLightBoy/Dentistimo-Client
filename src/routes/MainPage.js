import Map from "../components/Map";
import "./MainPage.css"

export default function Home() {
    return (
      <div>
        <Map zoom={10} center={{"lat":57.75,"lng":11.92}} />
      </div>
    );
  }