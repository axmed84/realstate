import React, { useContext } from 'react'
import './homepage.scss'
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'

function HomePage() {

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser);
  return (
    <div className='homepage'>
        <div className="textcontainer">
            <div className="wrapper">
            <h1 className='title'>Find Real Estate & Get Your Dream Place </h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Corrupti vitae possimus voluptatibus. Error tempora cumque nostrum,
                     distinctio reiciendis repudiandae, officia esse enim natus amet 
                     nobis aspernatur ullam dicta delectus rerum.</p>
                     <SearchBar />
                     <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>1200+</h1>
                            <h2>Proberty Ready</h2>
                        </div>
                     </div>
            </div>
        </div>
        <div className="imgcontainer">
            <img src="./bg.png" alt="" />
        </div>
    </div>
  )
}

export default HomePage