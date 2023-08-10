import React, { useEffect, useState } from 'react';
import './featured.scss';
import {AiFillPlayCircle} from "react-icons/ai";
import {AiOutlineInfoCircle} from "react-icons/ai";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Featured = ({type}) => {
  const [content, setContent] = useState({})

  useEffect(()=>{
    const FetchRandom = async()=>{
      try{
        const res = await axios.get(`https://netflix-clone-frontend-bo9q.onrender.com/movies/random?type=${type}`, {
          headers: {
            token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYwOGU0YTVhMzdhZTFhYjYzZmRmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTQ3MTcyN30.PI5BRgrG-34JsSjibl-97sXWMd4j_VvIX9-KxYNser4"
          }
        })
        setContent(res.data[0])
      }
      catch(err){
        console.log(err)
      }
    }
    FetchRandom()
  },[type])

  console.log(content)

  const handlePlay = ()=>{
  }
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movies' ? "Movies" :"Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="tvShow">Tv Show</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option> */

          </select>
        </div>
      )}
      <img width={"100%"} height={"100%"} className='imgHome' src={content?.img} alt="" />
      <div className='info'>
        <div className='title'>
        <p className='movieTitle'>{content?.title}</p>
        <p className='movieTitle'></p>
        </div>
        <span className='desc'>
          <p>{content?.desc}</p>
        </span>
        <div className="buttons">
        <Link to='/watch' state={{movie: content}} >
          <button className="play">
            <AiFillPlayCircle/>
            <span>play</span>
          </button>
          </Link>
          <button className="more">
            <AiOutlineInfoCircle/>
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured;

// "/Images/georginagio2.jpg"
// Join Georgina Rodríguez - mom, influencer, businesswoman and Cristiano Ronaldo's partner - 
// in this emotional and in-depth portrait of her daily life.

