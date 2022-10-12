import React, { useEffect, useRef, useState } from "react";
import './dashboard.css'

export default function Collections() {

    const [collection, setCollection] = useState([])
    const [newCollection, setNewCollection] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const collectionToEditRef = useRef("")
    const updatedCollectionNameRef = useRef("")
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const fetchCollections = async () => {
            await fetch('/collections')
                .then((res) => res.json()).then((data) => setCollection(data))
        }
        fetchCollections()
    }, [newCollection, editMode, alertMsg, setAlertMsg], [])




    //=============== CREATE COLLECTION ======================================

    const postCollection = async () => {

        var myHeaders = new Headers();
        var token = localStorage.getItem("access_token")
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": newCollection
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch('/collections', requestOptions)
            .then((res) => res.text()).then((text) => {
                switch (text) {
                    case "ok":
                        setAlert(true)
                        setAlertMsg("New Collection Added!")
                        setNewCollection("")
                        break
                    case "err":
                        setAlert(true)
                        setAlertMsg("Something Went Wrong! Please Try Again")
                        break
                    case "na":
                        setAlert(true)
                        setAlertMsg("Sorry, you're not authenticated!")
                        break
                    case "nv":
                        setAlert(true)
                        setAlertMsg("Sorry, You are a demo user!")
                        break
                    default:
                        setAlert(false)
                        setAlertMsg("")
                }
            })

    }



    //=============== UPDATE COLLECTION ======================================

    const upDateCollection = async () => {
        var myHeaders = new Headers()
        const token  = localStorage.getItem("access_token")

        myHeaders.append('content-type', 'application/json')
        myHeaders.append('token',token)

        const bodyData = JSON.stringify({ 'name': updatedCollectionNameRef.current })

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: bodyData,
            redirect: 'follow'
        }

        const collection = collectionToEditRef.current
        await fetch('/collections/' + collection , requestOptions)
            .then((res) => res.text()).then((result) => {
                switch (result) {
                    case "ok":
                        setAlert(true)
                        setAlertMsg("successfully updated!")
                        setEditMode(false)
                        break
                    case "err":
                        setAlert(true)
                        setAlertMsg("Something went wrong!")
                        setEditMode(false)
                        break
                    case "na":
                        setAlert(true)
                        setAlertMsg("Sorry, you're a demo user!")
                        break
                    case "nv":
                        setAlert(true)
                        setAlertMsg("Sorry, You are a demo user!")
                        break
                    default:
                        setAlert(false)
                }
            })
    }



    //=============== DELETE COLLECTION ======================================
    const deleteCollection = async (ev) => {

        const myHeaders = new Headers()
        const token = localStorage.getItem("access_token")
        myHeaders.append('content-type', 'application/json')
        myHeaders.append('token', token)

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        }

        await fetch('/collections/' + ev, requestOptions)
            .then((res) => res.text()).then((result) => {
                switch (result) {
                    case "ok":
                        setAlert(true)
                        setAlertMsg("Collection deleted successfully! (please refresh page)")
                        break
                    case "err":
                        setAlert(true)
                        setAlert("sorry, something went wrong!")
                        break
                    case "na":
                        setAlert(true)
                        setAlertMsg("Sorry, you're not authenticated!")
                        break
                    case "nv":
                        setAlert(true)
                        setAlertMsg("Sorry, you are a demo user!")
                        break
                    default:
                        setAlert(false)
                }
            })
    }

    const updateCollectionClick = (e) => {
        e.preventDefault()
        collectionToEditRef.current = (e.currentTarget.id)
        console.log(collectionToEditRef.current)
        setEditMode(!editMode)
    }


    function exitEditMode(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
    }


    function closeAlert(e) {
        e.preventDefault()
        setAlert(false)
    }



    //=============== RETURN COLLECTION COMPONENT ======================================

    return (
        <>
            {alert ?
                <div className="alert">
                    <i onClick={(e) => closeAlert(e)} className="fa fa-remove"> </i>
                    <p style={{ 'alignSelf': 'center' }}> {alertMsg} </p>
                </div>
                : <></>}


            <div className="collections-editor tab-content" id="collections-editor">

                <div className="collection-creator">
                    <input type="text" value={newCollection} placeholder="Create New Collection" onChange={(e) => setNewCollection(e.target.value)} />
                    <button onClick={postCollection}> <i className="fa fa-plus-circle fa-2x collection-editor-icons"> </i> </button>
                </div>

                {editMode ?
                    <div className="single-collection-editor" style={{ 'zIndex': '1' }}>
                        <i onClick={(e) => exitEditMode(e)} style={{ 'float': 'right', 'marginTop': '15px', 'marginRight': '15px', 'fontSize': '1.5rem', 'color': 'black', 'cursor': 'pointer', 'textShadow': '5px 5px 5px rgba(0,0,0,0.2)' }} className="fa fa-remove"></i>
                        <h5>Edit Collection</h5>
                        <input type="text" defaultValue={collectionToEditRef.current} onChange={(e) => updatedCollectionNameRef.current = (e.target.value)} />
                        <button onClick={upDateCollection}>Update</button>
                    </div>
                    :
                    <></>
                }

                {collection.map((item) => {
                    return (
                        <div className="collection-container" key={item._id} id={item.name}>
                            <h5>{item.name}</h5>
                            <button id={item.name} onClick={(e) => updateCollectionClick(e)}> <i className="fa fa-edit"> </i> </button>
                            <button onClick={(e) => deleteCollection(e.target.id)}> <i id={item.name} className="fa fa-trash "> </i> </button>
                        </div>)
                })}
            </div>
        </>
    )
}
