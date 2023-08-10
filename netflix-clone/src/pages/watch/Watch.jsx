import React, { useEffect, useState } from 'react';
import './watch.scss';
import {IoReturnUpBackOutline} from "react-icons/io5";
import {Link, useLocation} from "react-router-dom";


const Watch = () => {
  let location = useLocation()
  console.log(location)
  const movie = location.state?.movie
  // console.log(movie)


  const trailer = "https://videos.evolveplatform.net/videos/XuMkuPKTyio2fvIQ6lwTJWnCyNT2OYJ7ivholC8J_2773841728.mp4"

  return (
    <div className='watch'> 
      <div className="back">
        <Link to={'/'}><IoReturnUpBackOutline/></Link>
        <Link to={'/'}>Home</Link>
      </div>
      <video src={movie?.video} 
      className='video' autoPlay controls loop poster='https://nnmedia.nation.africa/uploads/2021/05/Netflix.jpeg' ></video>

    </div>
  )
}

export default Watch;