import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
    function myFunction(){
        var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  
    return (
    <div>
      <nav className="navbar" >
        <div className="topnav" id="myTopnav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link id="writePost-link" to="/login"> Dashboard </Link>
            <button className="icon" onClick={myFunction}> <i className="fa fa-bars"> </i> </button>
        </div>
      </nav>


      <Outlet />
      </div>
  )

};

export default Layout;