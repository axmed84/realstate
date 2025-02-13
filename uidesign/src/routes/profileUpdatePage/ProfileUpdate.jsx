import React, { useContext, useState } from 'react'
import './profileupdate.scss'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UploadWidget from '../../components/uploadWidget/UploadWidget'

function ProfileUpdate() {

    const {currentUser, updateUser} = useContext(AuthContext)
  
    const [avatar,setAvatar] = useState([])
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
      e.preventDefault()
      const formData = new FormData(e.target)

      const {username, email, password, avatar} = Object.fromEntries(formData)

      try {
        
        const res = await apiRequest.put(`/users/${currentUser.id}`, {
          username,
          email,
          password,
          avatar:avatar[0]
        });
        updateUser(res.data)
        navigate("/profile")
      } catch (error) {
        console.log(error);
        setError(error.response.data.message)
      }
    }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "axmed",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  )
}

export default ProfileUpdate