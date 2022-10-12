import React, { useEffect, useState } from "react";
import Post from "../post-card/post.js";
import './style.css'
import CollectionTitle from "../collection-header/collection_title.js";
import Loader from "../loader/loader.js";


export default function PostsPreview() {

    const [posts, setPosts] = useState([])
    const [collections, setCollections] = useState([])


    useEffect(() => {

        const fetchCollections = async () => {
            const fCollections = await fetch('/collections')
                .then((response) => response.json())
            setCollections(fCollections)
        }
        fetchCollections()

        const fetchposts = async () => {
            const fposts = await fetch('/posts')
                .then((response) => response.json())
            setPosts(fposts)
        }
        fetchposts()
    }, [])




    function PostsContainer() {
        if (posts.length === 0) {

            return (
                <Loader />
            )
        } else {
            return (


                collections.map((collection) => {
                    return (
                        <div className="PostsContainer" key={collection._id}>
                            <CollectionTitle name={collection.name} key={collection._id} />
                            {
                                // eslint-disable-next-line array-callback-return
                                posts.map((post) => {
                                    if (post.category === collection.name) {
                                        return (
                                            <Post key={post._id}
                                                title={post.title}
                                                author={post.author}
                                                date={post.date}
                                                preview={post.preview}
                                                image={post.image}
                                                category={post.category} />
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                })

            )
        }
    }




    return (

        <PostsContainer />
    )

}