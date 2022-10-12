import React, { useEffect, useState } from "react";
import "./style.css"

export default function Footer() {
    var date = new Date();
    var year = date.getFullYear();
    var copyright = "© " + year.toString() + " - Abdullah Shadeer";

    const [recentPosts, setRecentPosts] = useState([])
    const [collections, setCollections] = useState([])

    useEffect(() => {

        const fetchposts = async () => {
            const result = await fetch("/posts/recent/recent")
                .then((res) => res.json())
            setRecentPosts(result)
        }
        const fetchCollections = async () => {
            const fCollections = await fetch('/collections')
                .then((response) => response.json())
            setCollections(fCollections)
        }
        fetchCollections()
        fetchposts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <footer>
            <div className="footer-content-container">
                <div className="recent-posts">
                    <span style={{'fontSize':'1.3rem'}}>RECENT POSTS</span>
                    <hr style={{'border':'none','borderBottom':'1px solid #d3d3d3'}}/>
                    { recentPosts ? recentPosts.map((item) => {
                        return(
                        <a href={'../../post/'+item.title} style={{'cursor':'pointer'}} key={item._id}> {item.title} </a> 
                        )
                        }) : <p>loading..</p> }
                </div>
                <div className="categories">
                    <span style={{'fontSize':'1.3rem'}}>CATEGORIES</span>
                    <hr style={{'border':'none','borderBottom':'1px solid #d3d3d3'}}/>
                    { collections ? collections.map((item) => {
                        return(
                        <a href={'../../categories/'+item.name} style={{'cursor':'pointer'}} key={item._id}> {item.name} </a> 
                        )
                        }) : <p>loading..</p> }
                </div>
            </div>

            {/*copyright=========================*/}
            <p style={{'fontSize':'1rem'}} id="copyright">{copyright} </p>
        
        </footer>
        </>
    )
}
