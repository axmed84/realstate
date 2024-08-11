import React, { useContext, useState } from 'react'
import './singlepage.scss'
import Slider from '../../components/slider/Slider'
import Map from '../../components/map/Map'
import { redirect, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'

function SinglePage() {
  const post = useLoaderData();
  const [saved,setSaved] = useState(post.isSaved)
  const {currentUser} = useContext(AuthContext)

  const handleSave = async ()=> {
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev)
    if(!currentUser){
      redirect("/login")
    }
    try {
      
      await apiRequest.post("/users/save", {postId: post.id})
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev)
    }
  }
  return (
    <div className='singlepage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images}/>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom">
              {post.postDetail.desc}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
      <div className="wrapper">
        <p className='title'>General</p>
        <div className="listvertical">
          <div className="feature">
            <img src="/utility.png" alt="" />
            <div className="featuretext">
              <span>Utitlities</span>
              {
                post.postDetail.utilities === "owner" ?
             ( <p>Owner is responsible</p>) :
             ( <p>Tenant is responsible</p>)
            }
            </div>
          </div>
          <div className="feature">
            <img src="/pet.png" alt="" />
            <div className="featuretext">
              <span>Pet Polocy</span>
              {
                post.postDetail.pet === "allowed" ? (
                  <p>Pet Allowed</p>
                ) : (
                <p>Pet not Allowed</p>)
              }
            </div>
          </div>
          <div className="feature">
            <img src="/fee.png" alt="" />
            <div className="featuretext">
              <span>Income Policy</span>
              <p>{post.postDetail.income}</p>
            </div>
          </div>
        </div>
        <p className='title'>Sizes </p>
        <div className="sizes">
          <div className="size">
            <img src="/size.png" alt="" />
            <span>{post.postDetail.size} sqrft</span>
          </div>
          <div className="size">
            <img src="/bed.png" alt="" />
            <span>{post.bedroom} bed</span>
          </div>
          <div className="size">
            <img src="/bath.png" alt="" />
            <span>{post.bathroom} bathroom</span>
          </div>
          </div>
        <p className='title'>Near by Places </p>
        <div className="listhorizontal">
        <div className="feature">
            <img src="/school.png" alt="" />
            <div className="featuretext">
              <span>School</span>
              <p>{post.postDetail.school > 999 ? post.postDetail.school/1000 + "km" :
               post.postDetail.school + "m"} away</p>
            </div>
          </div>
          <div className="feature">
            <img src="/bus.png" alt="" />
            <div className="featuretext">
              <span>Bus stop</span>
              <p>{post.postDetail.bus > 999 ? post.postDetail.bus/1000 +"km" : 
              post.postDetail.bus +"m"} away</p>
            </div>
          </div>
          <div className="feature">
            <img src="/restaurant.png" alt="" />
            <div className="featuretext">
              <span>Restaurant</span>
              <p>{post.postDetail.restaurant > 999 ? post.postDetail.restaurant/1000 +"km" :
               post.postDetail.restaurant +"m"}m away</p>
            </div>
          </div>
          </div>
        <p className='title'>Location</p>
        <div className="mapcontainer">
          <Map item={[post]}/>
        </div>
        <div className="buttons">
          <button>
            <img src="/chat.png" alt="" /> Send a Messages
          </button>
          <button onClick={handleSave} 
          style={{backgroundColor: saved ? "#fece51" : "white"}}>
            <img src="/save.png" alt="" />
            {saved ? "Place Saved" : "Save the Place"}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SinglePage