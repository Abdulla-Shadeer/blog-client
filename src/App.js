import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import Nopage from './pages/Nopage.js';
import About from './pages/About.js'
import Login from './pages/login.js';
import Post from "./pages/post.js";
import ViewByCategory from "./pages/viewByCategory.js";
import Dashboard from "./pages/dashboard.js";

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="post/:title" element={<Post/>}/>
        <Route path="categories/:catName" element={<ViewByCategory />}/>
        <Route path="dashboard" element={<Dashboard />}/> 
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
