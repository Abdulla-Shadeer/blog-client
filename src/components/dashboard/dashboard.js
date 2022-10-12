import React from 'react'
import './dashboard.css'
import Layout from '../../pages/Layout.js'
import Footer from '../footer/footer.js'
import PostWriter from './postwriter.js'
import Sidebar from './sidebar.js'
import Collections from './collections.js'
import EditPosts from './editPosts.js'

export default function Dashboard() {
    return (
        <>
        <Layout/>

        <div className='dashboard-wraper'>

                <Sidebar />
            
            <div className='right-container'>

                <PostWriter />
                <Collections />
                <EditPosts />
            </div>
        </div>

        <Footer />
        </>
    )
}