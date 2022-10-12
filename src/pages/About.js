import React from "react";
import Layout from "./Layout.js"
import Footer from '../components/footer/footer.js'
import './about.css'
function About(){
    
    return(
    <>
    <Layout />
    <h1 className="hero-title">MERN Stack-Based Simple Blogging System</h1>
    <hr style={{'position':'relative','top':'50px'}}/>
    <div className="about-page-body-container">
            <div className="futures-container">
                <h2 style={{'marginTop':'0'}}>Futures</h2>
                    <span className="future-item"> <i className="fa fa-check-circle"> </i> Complete CRUD Operations & Control</span>
                    <span className="future-item"> <i className="fa fa-check-circle"> </i> Client-Server Architecture & APIs</span>
                    <span className="future-item"> <i className="fa fa-check-circle"> </i> Role Based Security & Authentication Middleware</span>
                    <span className="future-item"> <i className="fa fa-check-circle"> </i> Mobile Responsive UI Framework</span>
                    <span className="future-item"> <i className="fa fa-check-circle"> </i> Simple & Clean Codes For Better Performance</span>
            </div>
            <div className="technologies-used">
            <h2 style={{'width':'100%'}}>Technologies Used</h2>
                <div className="used-tech-item"> <span> MongoDB </span> </div>
                <div className="used-tech-item"> <span> ExpressJS </span> </div>
                <div className="used-tech-item"> <span> React </span> </div>
                <div className="used-tech-item"> <span> NodeJS </span> </div>
                <div className="used-tech-item"> <span> JSON & JWT </span> </div>
                <div className="used-tech-item"> <span> Javascript </span> </div>
                <div className="used-tech-item"> <span> tinyMCE </span> </div>
                <div className="used-tech-item"> <span> HTML5 & CSS3 </span> </div>
            </div>
            </div>
    <Footer />
    </>)
}

export default About