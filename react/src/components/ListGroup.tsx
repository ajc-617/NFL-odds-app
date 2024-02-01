import { MouseEvent, useState, useEffect, Dispatch, SetStateAction } from "react";
import "./ListGroup.css"
//import bearsLogo from "../assets/team_pics/bears.png"
import ListElement from "./ListElement";
import Button from "./Button";
interface Props {
    heading: string;
    // (item: string) => void
    onSelectItem: (item: string) => void;
    data: Datum[];
    changeLightMode: Dispatch<SetStateAction<boolean>>;
    darkMode: boolean;
}

export interface Datum {
    awayTeam: string;
    homeTeam: string;
    awayTeamML: number;
    homeTeamML: number;
    spread: number;
    startTime: string;
}


function ListGroup({heading, onSelectItem, data, changeLightMode, darkMode}: Props) {
    //Hook
    //const [selectedIndex, setSelectedIndex] = useState(-1)
    //Event handler
    //const handleClick = (event: MouseEvent) => console.log(event);

    return (
        <>
            <h1 style={{color: darkMode ? "white": "black"}}>{heading}</h1>
            <div className={darkMode ? "dark-mode" : undefined} id="site-info">
                Hello and welcome to my NFL odds webpage. On this webpage, you can see the odds of upcoming NFL games using odds provided by DraftKings Sportsbook. 
                Specifically, you will be able to see the money line for both teams and the point spread for the game as well. Start times for the games are given in 
                Eastern Time. If you are seeing games on the user interface that have already occured, this is because the NFL season is already over and I am returning
                the following games to demonstrate how the UI would work if there were still games left in the season. You can switch between light and dark mode in the 
                bottom left, which will also change the background image.

            </div>
            {data.length === 0  && <p>No items found</p>}
            {data.length !== 0 &&
            <ul className="list-group">
                {data.map((matchupInfo: Datum, index) => 
                    <ListElement 
                        index={index}
                        numElems={data.length}
                        awayTeam={matchupInfo.awayTeam} 
                        homeTeam={matchupInfo.homeTeam}
                        awayTeamML={matchupInfo.awayTeamML}
                        homeTeamML={matchupInfo.homeTeamML}
                        spread={matchupInfo.spread}
                        startTime={matchupInfo.startTime}
                        darkMode={darkMode}>
                    </ListElement>
                )}
            </ul>
            }
            <Button onClick={changeLightMode} darkMode={darkMode}>{darkMode ? "Switch to light mode" : "Switch to dark mode"}</Button>

            {/*             
            {darkMode && <button type="button" className="btn btn-light light-dark-mode-btn ">Switch to light mode</button>}
            {!darkMode && <button type="button" className="btn btn-dark light-dark-mode-btn ">Switch to dark mode</button>}  
            */}
            
        </>
    );
}

export default ListGroup;


