
import React, { useRef, useState, useEffect } from "react";
import './dashboard.css'
import { Editor } from '@tinymce/tinymce-react';



export default function PostWriter() {

    const editorRef = useRef(null);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    //const [category, setCategory] = useState("")
    const categoryRef = useRef("")
    const [file, setFile] = useState()
    const [collection, setCollection] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")


    useEffect(() => {
        const fetchCollections = async () => {
            await fetch('/collections')
                .then((res) => res.json()).then((result)=>setCollection(result))
        }
        fetchCollections()
    },[])


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
                formdata.append("category", categoryRef.current)
                formdata.append("image", file)

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow',
                };

                const response = await fetch("/posts", requestOptions)
                    .then(response => response.text())

                switch (response) {
                    case "ok":
                        setAlert(true)
                        setAlertMsg("New post published!")
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
                        setAlertMsg("Sorry, you are a demo user!")
                        break
                    default:
                        setAlert(false)
                        break
                }

            } catch (error) {
                setAlert(true)
                setAlertMsg("Sorry, something went wrong!")
            }

        }
        post()
    }


    function handleSubmit(e) {
        e.preventDefault()
        postData()
    }


    function handleFileChange(event) {

        var reader = new FileReader();

        reader.onload = function (e) {
            const img = document.querySelector("#thumbImg")
            img.setAttribute('src', e.target.result);
            //clear previous image
            setFile("")
            setFile(e.target.result)
        };

        reader.readAsDataURL(event);

    }


    function closeAlert(e) {
        e.preventDefault()
        setAlert(false)
    }


    return (
        <>

            {
                //if alert enabled
                alert ?
                    <div className="alert">
                        <i onClick={(e) => closeAlert(e)} className="fa fa-remove"> </i>
                        <p style={{ 'alignSelf': 'center' }}> {alertMsg} </p>
                    </div>

                    : <></>

            }

            <div className='post-writer tab-content'>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="pTitle"> Post Title : </label>
                    <input type="text" name="pTitle" onChange={(e) => setTitle(e.target.value)} />
                    <hr />

                    <label htmlFor="">Short description <span className="note"> * used for post previews (maximum 200 words)</span></label>
                    <textarea id="desc" name="pDescription" onChange={(e) => setDesc(e.target.value)}/>
                    <hr />




                    <label htmlFor="pBody">Body : <span className="note">* If you can't see the text editor, please reload the page</span></label>
                    <Editor
                        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue='<p>Write your post here.</p>'
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
                    <select name="pCategory" id="pCategory" onChange={(e) => categoryRef.current =  (e.target.value)}>
                        {collection.map((item) => {
                            return (
                                <option key={item._id}>{item.name}</option>
                            )
                        })}
                    </select>
                    <hr />

                    <label htmlFor="catImg"> Cover Image :</label>


                    <input type="file" name="catImg" id="catImg" accept="image/jpg,image/jpeg,image/png" onChange={(e) => handleFileChange(e.target.files[0])} />
                    <div id="thumb" style={{ width: "200px", height: "auto" }}>
                        <img id="thumbImg" src="" alt="" />
                    </div>


                    <button className='btn-publish' type="submit">Publish</button>
                </form>

            </div>
        </>
    )


}
