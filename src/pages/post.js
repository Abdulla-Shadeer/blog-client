import React, { useEffect, useState } from "react"
import SinglePost from "../components/single-post/singlePost.js"
import Loader from '../components/loader/loader.js'

export default function Post(){
    
    //getting current post title
    const location = window.location.pathname
    const pathArr = location.split("/")
    const title = pathArr[2]

    const [post, setPost] = useState([])
    const url = "/posts/"+title.toString()

    window.addEventListener('hashchange',(ev)=>{
        alert(ev)
    })

    useEffect(()=>{
        try {
            const fetchedPost = async ()=>{
                const fpost = await fetch(url)
                .then((response)=>response.json())
                setPost(fpost)
            }
            fetchedPost()
        } catch (error) {
            console.log(error)
        }
    },[url,title])
    


    return(
        post.length === 0? <Loader/> :
        <SinglePost 
        title={post.title}
        author={post.author}
        date={post.date}
        preview={post.preview}
        content={post.content}
        image={post.image}
        category={post.category}
        />
    )
}