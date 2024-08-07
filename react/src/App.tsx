import { useEffect, useState } from "react"
import axios from "axios"
import ListGroup from "./components/ListGroup"
import Button from "./components/Button"
import { Datum } from "./components/ListGroup"
import './App.css'

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item)
  }

  const [fetchedData, setFetchedData] = useState<FetchedDatum[]>([]);
  
  //setting this to false by default because by default, we'll have light mode
  const [darkMode, setLightMode] = useState(false)

  //Change background image depending on whether darkMode is true or false
  document.body.style.backgroundImage = darkMode ? "url(" + "../src/assets/night_winter_background.png" + ")" : "url(" + "../src/assets/light_winter_background.jpg" + ")";
  document.body.style.backgroundRepeat = "no-repeat";

  useEffect(() => {
    axios.request(
      {
        method: "get",
        url: "http://127.0.0.1:5000/upcoming_odds_info",
      }
    )
    .then(response => {
      //Use below line for testing purposes (making sure API returns data correctly)
      console.log(response.data);
      setFetchedData(response.data)
    })
    .catch(error => {
      console.error(error);
    })
  },[])

  return (
    <>
      <ListGroup heading="Welcome to my NFL odds info webpage" onSelectItem = {handleSelectItem} data={mapDatatoKeys(fetchedData)} changeLightMode={setLightMode} darkMode={darkMode}></ListGroup>
    </>
  )
}

function mapDatatoKeys(fetchedData: FetchedDatum[]): Datum[] {
  let loadedData: Datum[] = [];
  for (let curDatum of fetchedData) {
    let newDatum: Datum = {
      awayTeam : curDatum["Away Team"],
      homeTeam : curDatum["Home Team"],
      awayTeamML : curDatum["Away Team Odds"],
      homeTeamML : curDatum["Home Team Odds"],
      startTime : curDatum["Start Time"],
      spread : curDatum["Spread"],
      total : curDatum["Total"]
    };
    loadedData.push(newDatum);  
  }

  return loadedData;
}

interface FetchedDatum {
  "Away Team": string;
  "Home Team": string;
  "Away Team Odds": number;
  "Home Team Odds": number;
  "Start Time": string;
  "Spread": number;
  "Total": number;
}


export default App