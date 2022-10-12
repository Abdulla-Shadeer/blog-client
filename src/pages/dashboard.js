import Db from "../components/dashboard/dashboard.js";


export default function Dashboard(){
    const token = localStorage.getItem("access_token")
    if(token){
        return <Db />
    }else{
        window.location.replace("/login")
    }

}

