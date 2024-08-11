import React, { useContext, useEffect } from 'react'
import './profilepage.scss'
import List from '../../components/list/List'
import Chat from '../../components/chat/Chat'
import apiRequest from '../../lib/apiRequest'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function ProfilePage() {


    const navigate = useNavigate()
    const {currentUser, updateUser} = useContext(AuthContext)

    const handleLogout = async ()=> {
        try {
            await apiRequest.post("/auth/logout")
            updateUser(null)
            navigate("/")
        } catch (error) {
            
        }
    }

  return (
    <div className='profilepage'>
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <Link to="/profile/update">
                    <button>Update Profile</button>
                    </Link>
                </div>
                <div className="info">
                    <span>
                        Avatar: 
                        <img src={currentUser.avatar || "/noavatar.jpg"} 
                    alt="" />
                    </span>
                    <span>Username: <b>{currentUser.username}</b></span>
                    <span>Email: <b>{currentUser.email}</b></span>
                    <button onClick={handleLogout}>LogOut</button>
                </div>
                <div className="title">
                    <h1>My List</h1>
                    <Link to="/add">
                    <button>Create New Post</button>
                    </Link>
                </div>
                <List/>
                <div className="title">
                    <h1>Saved List</h1>
                </div>
                <List/>
            </div>
        </div>
        <div className="chatcontainer">
            <div className="wrapper">
                <Chat/>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage