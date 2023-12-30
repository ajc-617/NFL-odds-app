import { MouseEvent, useState } from "react";
import "./ListGroup.css"
//import bearsLogo from "../assets/team_pics/bears.png"
import images from "../assets/team_pics/images";
interface Props {
    items: string[];
    heading: string;
    // (item: string) => void
    onSelectItem: (item: string) => void;
}

//const images = importAll(require.context('../assets/team_pics', false, /\.(png|jpe?g|svg)$/));

function ListGroup({items, heading, onSelectItem}: Props) {
    //Hook
    const [selectedIndex, setSelectedIndex] = useState(-1)
    //Event handler
    //const handleClick = (event: MouseEvent) => console.log(event);
    return (
        <>
            <h1>{heading}</h1>
            {items.length === 0 && <p>No items found</p>}
            <ul className="list-group">
                {items.map((item,index) => 
                    <li 
                        key={item} 
                        className={selectedIndex === index ? 'list-group-item active': "list-group-item"} 
                        onClick={() => {
                            setSelectedIndex(index)
                            onSelectItem(item)
                        }}>
                        {item}
                    </li>
                )}
                <li className="list-group-item">
                    <div className="float-child">
                        Chicago Bears
                        <br />
                        <img src={images.bearsLogo}/>
                        <br />
                        -155
                    </div>
                    <div className="float-child">
                        New York Jets
                        <br />
                        <img src={images.jetsLogo}/>
                        <br />
                        +130
                    </div>
                </li>
            </ul>
        </>
    );
}

function importAll(r: any) {
    return r.keys().map(r);
}

export default ListGroup;