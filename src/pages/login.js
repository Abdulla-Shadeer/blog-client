import React from "react";
import Layout from "./Layout.js"
import Footer from"../components/footer/footer.js"
import LoginForm from "../components/login/login.js"
import Dashboard from "../components/dashboard/dashboard.js";




function Login() {

    const token = localStorage.getItem("access_token")
    if(token){
        return(
            <Dashboard />
        )
    }else{
        return (
            <div>
                <Layout />
                <LoginForm />
                <Footer />
            </div>
        )
    }

    
}

export default Login