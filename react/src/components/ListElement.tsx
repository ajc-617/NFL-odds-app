import React from 'react'
import images from "../assets/team_pics/images";
import mappings from '../assets/team_pics/name_mappings';
import "./ListElement.css"

function ListElement(Props: Input) {
  return (
    <>
      <li className={"list-group-item"}>
        <h2>{Props.startTime}</h2>
        <div className="float-child">
            {Props.awayTeam}
            <br />
            <img src={images[mappings[Props.awayTeam]]}/>
            <br />
            {Props.awayTeamML}
            <br />
            {awayTeamFavorite(Props.awayTeamML, Props.homeTeamML) && Props.spread}
        </div>
        <div className="float-child">
            {Props.homeTeam}
            <br />
            <img src={images[mappings[Props.homeTeam]]}/>
            <br />
            {Props.homeTeamML}
            <br />
            {!awayTeamFavorite(Props.awayTeamML, Props.homeTeamML) && Props.spread}
        </div>
      </li> 
    </>
  )
}

function awayTeamFavorite(awayTeamML: number, homeTeamML: number): boolean {
  //If awayTeamML is lower than homeTeamML, this means awayTeam is favorited, so return true, otherwise, return false because homeTeam is favorited
  let returnVal: boolean = awayTeamML < homeTeamML ? true : false
  return returnVal;
}

export interface Input { 
  awayTeam: string;
  homeTeam: string;
  awayTeamML: number;
  homeTeamML: number;
  spread: number;
  startTime: string;
  index: number;
  numElems: number
}


export default ListElement