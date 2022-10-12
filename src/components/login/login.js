import { useState } from "react"
import "./login.css"

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [sttsMessage, setMessage] = useState("")


    const loginUser = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            var raw = JSON.stringify({
                "username": username,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            const response = await fetch("/auth/login", requestOptions)
                .then(response => response.json())

            if(response.message === "ok"){
            localStorage.setItem("access_token",response.access_token)
            setError(false)
            window.location.replace("/dashboard")
            }else if(response.message === "wc"){
                setMessage("wrong credentials! please try again")
                setError(true)
            }else if(response.message === "nu"){
                setMessage("you are authenticated as normal user")
                setError(true)
            }else{
                setMessage("something went wrong")
                setError(true)
            }
            

            

        } catch (error) {
            setMessage("something went wrong")
            setError(true)
        }
    }


    function handleSubmit(e) {
        e.preventDefault()
        loginUser()
    }

    return (
        <div className="login-form-container">
            <span className="form-title">  SignIn </span>
            <div className="login-details">
                <p><b>Use these credentials to login </b></p>
                <ul>
                    <li> Username : admin </li>
                    <li> Password : admin123</li>
                </ul>
            </div>
            <form name="loginForm" onSubmit={handleSubmit}>
                <br />
                <br />
                <label htmlFor="username">Username :</label>
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <br />

                {error && <p className="error"> {sttsMessage} </p>}

                <button type="submit" >Login</button>
            </form>
        </div>
    )
}