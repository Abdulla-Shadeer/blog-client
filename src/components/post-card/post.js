import React from "react";
// eslint-disable-next-line
import './post.css'
import { Link,Outlet } from "react-router-dom";

export default function Post(props){
    const posts = props

    return (
        <div className="post-container" >
            
            <div className="img-container">
                <div className="cat-container">
                <p>{posts.category}</p>
                </div>
            <img src={posts.image} alt={posts.title}></img>
            </div>

            <div className="content-container">
            <h3>{posts.title}</h3>
            <p className="little-p">{posts.author}</p>
            <p className="little-p">{posts.date}</p>
            <p>{posts.preview.slice(0,200)+"..."}</p>
            <Link to={"../../post/"+posts.title}> <button>read more</button> </Link>
            <Outlet />
            </div>

        </div>
    )
}