import React from "react";
//eslint-disable-next-line
import './style.css'
import { Link } from "react-router-dom";

function CollectionTitle(props){
    return (
        <div className="title-container">
            <h3> {props.name} </h3>
            <Link className="cat-link" to={"categories/"+props.name}>View more</Link>
        </div>
    )
}

export default CollectionTitle