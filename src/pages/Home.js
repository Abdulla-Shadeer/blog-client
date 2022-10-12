import React from "react";
import Layout from "./Layout.js";
import PostPreview from "../components/posts-preview/postsPreview.js"
import Footer from "../components/footer/footer.js";

//eslint-disable-next-line
import style from './index.css'

function Home(){

    return(
        <div>
            <Layout/>
            <PostPreview />
            <Footer />
        </div>
    )
}

export default Home