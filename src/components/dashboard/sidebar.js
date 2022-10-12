import React from "react";
import './dashboard.css'

export default function Sidebar(){

    function switchTabs(evt, target){
        const tabs = document.querySelectorAll(".tab-content")
        for (var i=0; i < tabs.length; i++){
            tabs[i].style.display="none"
        }
        document.querySelector(target).style.display="flex"

        const buttons = document.querySelectorAll(".btn-sidebar")
        for (var k=0; k<buttons.length; k++ ){
            buttons[k].className = buttons[k].className.replace(" active","")
        }
        evt.currentTarget.className+=" active"

    }


    function logout(){
        localStorage.removeItem('access_token')
        window.location.reload()
    }

    return(
        <>
            <div className='sidebar'>
                <button onClick={(e)=>switchTabs(e,".post-writer")} className='btn-sidebar active'> <i className="fa fa-plus-circle sidebar-icons"> </i> New Post </button>
                <button onClick={(e)=>switchTabs(e,".collections-editor")} className='btn-sidebar'> <i className="fa fa-book sidebar-icons"> </i> Collections </button>
                <button onClick={(e)=>switchTabs(e,".post-editor")} className='btn-sidebar'> <i className="fa fa-edit sidebar-icons"> </i> Edit posts </button>
                <button onClick={logout} className='btn-sidebar btn-logout'> <i className="fa fa-sign-out"> </i> Logout </button>
            </div>
        </>
    )
}