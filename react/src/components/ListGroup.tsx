import { MouseEvent, useState, useEffect } from "react";
import "./ListGroup.css"
//import bearsLogo from "../assets/team_pics/bears.png"
import ListElement from "./ListElement";
interface Props {
    heading: string;
    // (item: string) => void
    onSelectItem: (item: string) => void;
    data: Datum[];
}

export interface Datum {
    awayTeam: string;
    homeTeam: string;
    awayTeamML: number;
    homeTeamML: number;
    spread: number;
    startTime: string;
}


function ListGroup({heading, onSelectItem, data}: Props) {
    //Hook
    //const [selectedIndex, setSelectedIndex] = useState(-1)
    //Event handler
    //const handleClick = (event: MouseEvent) => console.log(event);
    return (
        <>
            <h1>{heading}</h1>
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
                        startTime={matchupInfo.startTime}>
                    </ListElement>
                )}
            </ul>
            }
        </>
    );
}

export default ListGroup;


