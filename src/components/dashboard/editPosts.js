import React, { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import './dashboard.css'

export default function EditPosts() {

    //these variables for storing contents of selected post to edit
    const titleToEditRef = useRef("")
    const descToEditRef = useRef("")
    const categoryToEditRef = useRef("")
    const fileToEditRef = useRef("")
    const bodyToEditRef = useRef("")


    const [posts, setPosts] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [collection, setCollection] = useState([])
    const editorRef = useRef(null);
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [category, setCategory] = useState()
    const [file, setFile] = useState()







    useEffect(() => {
        const fetchPosts = async () => {
            const result = await fetch("/posts")
                .then((res) => res.json())
            setPosts(result)
        }
        const fetchCollections = async () => {
            const result = await fetch('/collections')
                .then((res) => res.json())
            setCollection(result)
        }
        fetchPosts()
        fetchCollections()
    }, [alert, alertMsg,], [])


    // UPDATE POST =============================================================
    function postData() {

        const post = async () => {
            try {
                var myHeaders = new Headers();
                const token = localStorage.getItem("access_token")
                myHeaders.append('token', token)

                const formdata = new FormData()
                formdata.append("title", title)
                formdata.append("desc", desc)
                formdata.append("post", editorRef.current.getContent())
                formdata.append("category", category)
                formdata.append("image", file)
                console.log(formdata)

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow',
                };

                const response = await fetch("/posts/" + titleToEditRef.current, requestOptions)
                    .then(response => response.text())

                switch (response) {
                    case "ok":
                        setAlert(true)
                        setAlertMsg("Successfully updated!")
                        setEditMode(false)
                        break
                    case "np":
                        setAlert(true)
                        setAlertMsg("Sorry, no posts found!")
                        setEditMode(false)
                        break
                    case "err":
                        setAlert(true)
                        setAlertMsg("Sorry, something went wrong!")
                        setEditMode(false)
                        break
                    case "na":
                        setAlert(true)
                        setAlertMsg("Sorry, you're not authenticated!")
                        setEditMode(false)
                        break
                    case "nv":
                        setAlert(true)
                        setAlertMsg("Sorry, You are a demo user!")
                        setEditMode(false)
                        break
                    default:
                        setAlert(false)
                        break
                }

            } catch (error) {
                console.log(error)
            }

        }
        post()
    }



    function handleFileChange(event) {
        var reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById("thumbImgInPostEditor")
            img.setAttribute('src', e.target.result);
            //clear previous image
            setFile("")
            setFile(e.target.result)
        };
        reader.readAsDataURL(event);
    }



    function handleSubmit(e) {
        e.preventDefault()
        postData()
    }



    // DELETE POST ==============================================================
    const deletePost = async (ev) => {

        const token = localStorage.getItem("access_token")
        const myHeader = new Headers()

        myHeader.append('token', token)
        myHeader.append('content-type', 'application/json')

        const requestOptions = {
            method: 'DELETE',
            headers: myHeader,
            redirect: 'follow'
        }

        const result = await fetch("/posts/" + ev, requestOptions)
            .then((res) => res.text())

        switch (result) {
            case "ok":
                setAlert(true)
                setAlertMsg("Successfully deleted!")
                break
            case "err":
                setAlert(true)
                setAlertMsg("Sorry, something went wrong!")
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
                break
        }
    }


    // fetching and storing contents of selected post for edit
    const updatePost = async (ev) => {
        ev.preventDefault()
        const postTitleToEdit = ev.target.id

        await fetch('/posts/' + postTitleToEdit)
            .then((res) => res.json()).then((result) => {
                titleToEditRef.current = (result.title)
                descToEditRef.current = (result.preview)
                bodyToEditRef.current = (result.content)
                fileToEditRef.current = (result.image)
                categoryToEditRef.current = (result.category)

                //if user clicks update button without changing any feilds, form will submitted as empty and all post data will be lost! 
                //to prevent above issue, these variables also assigned inorder to prevent empty update
                //so, even user clicks update button without changing anything, post will be updated same as befor
                setTitle(result.title)
                setDesc(result.preview)
                editorRef.current = result.content
                setFile(result.image)
                setCategory(result.category)

                setEditMode(!editMode)
            })





    }

    function exitEditMode(ev) {
        ev.preventDefault()
        setEditMode(!editMode)
    }

    function closeAlert(e) {
        e.preventDefault()
        setAlert(false)
    }


    return (
        <div className="post-editor tab-content">
            {editMode ?
                //if edit mode enabled
                <div style={{ 'backgroundColor': 'white', 'boxShadow': '5px 5px 5px rgba(0,0,0,0.2)' }}>
                    <div style={{ 'width': '100%', 'height': '40px',  'marginBottom': '40px' }}>
                        <span style={{'marginTop':'20px','marginLeft':'20px','fontSize':'1rem','fontWeight':'400'}} className="note"> <i className="fa fa-bell"></i> Plese close and re-open the editor if you can't see the contents</span><i onClick={(e) => exitEditMode(e)} style={{ 'float': 'right', 'marginTop': '15px', 'marginRight': '15px', 'fontSize': '1.5rem', 'color': 'black', 'cursor': 'pointer', 'textShadow': '5px 5px 5px rgba(0,0,0,0.2)' }} className="fa fa-remove"></i>
                    </div>
                    <form style={{ 'margin': '20px' }} onSubmit={handleSubmit}>

                        <label htmlFor="pTitle"> Post Title : </label>
                        <input type="text" defaultValue={titleToEditRef.current} onChange={(e) => setTitle(e.target.value)} />
                        <hr />

                        <label htmlFor="">Short description <span className="note"> * used for post previews (maximum 200 words)</span></label>
                        <textarea defaultValue={descToEditRef.current} id="desc" onChange={(e) => setDesc(e.target.value)} />
                        <hr />




                        <label htmlFor="pBody">Body : <span className="note">* If you can't see the text editor, please reload the page</span></label>
                        <Editor
                            tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={bodyToEditRef.current}
                            init={{
                                height: 600,
                                menubar: true,
                                plugins: [
                                    'advhr', 'advimage', 'advlink', 'advlist', 'autolink', 'autoresize', 'autosave', 'link', 'anchor', 'directionality', 'emotions', 'fullscreen', 'iespell', 'inlinepopups', 'insertdatetime', 'layer', 'lists', 'media', 'image', 'nonbreaking', 'noneditable', 'pagebreak', 'paste', 'preview', 'print', 'save', 'searchreplace', 'style', 'tabfocus', 'table', 'template', 'visualchars', 'xhtmlxtras', 'wordcount'
                                ],
                                toolbar: 'undo redo styleselect bold italic fontfamily fontsize blocks link unlink forecolor lineheight alignleft aligncenter alignright alignjustify | bullist numlist advhr advimage advlink advlist autolink autoresize autosave directionality emotions fullscreen iespell inlinepopups insertdatetime layer lists media image table tableofcontents tableofcontentsupdate paste nonbreaking noneditable pagebreak searchreplace style tabfocus template preview print save',
                                toolbar_mode: 'wrap',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />



                        <hr />
                        <label htmlFor="pCategory"> Category</label>
                        <select defaultValue={categoryToEditRef.current} id="pCategory" onChange={(e) => setCategory(e.target.value)}>
                            {collection.map((item) => {
                                return (
                                    <option key={item._id}>{item.name}</option>
                                )
                            })}
                        </select>
                        <hr />

                        <label htmlFor="catImg"> Cover Image :</label>


                        <input type="file" id="catImg" accept="image/jpg,image/jpeg,image/png" onChange={(e) => handleFileChange(e.target.files[0])} />
                        <div id="thumb" style={{ width: "200px", height: "auto" }}>
                            <img id="thumbImgInPostEditor" src="" alt="" />
                            <p>Current Image</p>
                            <img id="currentImg" src={fileToEditRef.current} alt="" />
                        </div>


                        <button className='btn-publish' type="submit">Update</button>
                    </form>
                </div>




                //if edit mode not enabled
                : <>
                    {
                        //if alert enabled
                        alert ?
                            <div className="alert">
                                <i onClick={(e) => closeAlert(e)} className="fa fa-remove"> </i>
                                <p style={{ 'alignSelf': 'center' }}> {alertMsg} </p>
                            </div>

                            : <></>

                    }
                    <div className="post-editor-header">
                        <div className="header-title">
                            <p>Title</p>
                        </div>
                        <div className="header-category">
                            <p>Category</p>
                        </div>
                        <div className="header-date">
                            <p>Date</p>
                        </div>
                        <div className="header-modify">
                            <p>Modify</p>
                        </div>
                    </div>
                    {
                        //mapping posts 
                        posts.map((post) =>
                            <div className="single-post-container" key={post._id}>
                                <div className="header-title">
                                    <h5>{post.title}</h5>
                                </div>
                                <div className="header-category">
                                    <p>{post.category}</p>
                                </div>
                                <div className="header-date">
                                    <p>{post.date}</p>
                                </div>
                                <div className="header-modify">
                                    <button onClick={(e) => updatePost(e)}> <i id={post.title} className="fa fa-edit"> </i> </button>
                                    <button onClick={(e) => deletePost(e.target.id)}> <i id={post._id} className="fa fa-trash"> </i> </button>
                                </div>
                            </div>
                        )

                        // end of post mapping
                    }
                </>
                //end of conditional rendering (edit mode && display mode)
            }
        </div>
    )
}