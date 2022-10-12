import { useEffect, useState } from "react"
import Post from "../components/post-card/post.js"
import '../components/posts-preview/style.css'
import Layout from "./Layout.js"
import Loader from '../components/loader/loader.js'
import Footer from "../components/footer/footer.js"

export default function ViewByCategory(){
    const location = window.location.pathname
    const locationSplitted = location.split("/")
    const categoryName = locationSplitted[2]

    const [posts, setPosts] = useState([])
    const url = '/collections/'+categoryName.toString()
    
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const fetchedPosts = await fetch(url).then((response)=>response.json())
            setPosts(fetchedPosts)
        }
        fetchPosts()
    },[url])

    return (
        <>
        <Layout />
        <h1 style={{fontSize:"3rem",textAlign:"center",border:"1px solid black",'borderLeft':'none','borderRight':'none',padding:"0.7rem",backgroundColor:"white",position: 'relative',
    top: '30px'}}> {categoryName} </h1>
    {posts.length === 0? <Loader/>:
        <div className="PostsContainer">
            {posts.map((post)=>
                <Post key={post._id}
                title = {post.title}
                author = {post.author}
                date = {post.date}
                preview = {post.preview}
                image = {post.image}
                />
            )}
        </div>}
        <Footer />
        </>
    )
}