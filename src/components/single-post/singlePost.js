import React from "react";
import './singlePost.css'
import Layout from '../../pages/Layout.js'
import Footer from '../footer/footer.js'

export default function SinglePost(props) {
    return (
        <>
            <Layout />
            <div className="post-page-post-title">
                <h1>{props.title}</h1>
            </div>
            <div className="single-post-page-header">

                <div className="post-meta-data">
                    <p>Wrote By : {props.author}</p>
                    <p style={{ 'marginTop': '-8px' }}>{props.date}</p>
                    <span className="post-category-tag">{props.category}</span>
                    <hr style={{ 'margin': '20px auto', 'border': 'none', 'borderBottom': '1px solid #d3d3d3' }} />
                    <p style={{ 'textAlign': 'justify' }}>{props.preview}</p>
                </div>

                <div className="post-page-cover-image">
                    <img src={props.image} alt={props.image} />
                </div>


            </div>
            
            <div className="single-post-page-body" dangerouslySetInnerHTML={{ __html: props.content }}>

            </div>

            <Footer />
        </>
    )
}