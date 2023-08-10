import React, { useEffect, useState } from 'react'
import "./listItem.scss"
import {BsFillPlayFill} from "react-icons/bs";
import {IoMdAdd} from "react-icons/io"
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import {AiOutlinePause} from "react-icons/ai"
import axios from 'axios';
import {Link} from "react-router-dom";


const ListItem = ({item}) => {

  const [playVideo, setPlayVideo]  =  useState(false);
  const [movie, setMovie] = useState(); 

  const togglePlayVideo = ()=>{
    setPlayVideo((curr)=>curr === false ? true : false)
  }

  useEffect(()=>{
    const getMovie = async()=>{
      try{
        const res = await axios.get("https://netflix-clone-oycx.onrender.com/movies/find/" + item,  {
          headers :{
            token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYwOGU0YTVhMzdhZTFhYjYzZmRmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTQ3MTcyN30.PI5BRgrG-34JsSjibl-97sXWMd4j_VvIX9-KxYNser4`
          }
        })
        setMovie(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getMovie();
  },[])

  
  return (
    <div className='listItem'>
     <Link to={'/watch'} state={{movie:movie}}>
      { playVideo ?
            <video className='listItemImg' src={movie?.video} autoPlay={true} 
            muted={true} loop poster="https://www.comingsoon.net/wp-content/uploads/sites/3/2023/01/OC_Still-e1674671897712.jpg?w=1024">
            </video>
       :
        <img className='listItemImg' src={movie?.img} alt="" />
    } 
    </Link>
     
      <div className="itemInfo">
        <div className="icons">
          {playVideo ? (<AiOutlinePause className='iconReaction' onClick={togglePlayVideo}/>):
                       (<BsFillPlayFill className='iconReaction' onClick={togglePlayVideo}/>)
          }

          <IoMdAdd className='iconReaction'/> 
          <AiOutlineLike className='iconReaction'/>
          <AiOutlineDislike className='iconReaction'/>
        </div>  
        <div className="itemInfoTop">
          <span className='itemInfoTimeAge'>
            <p>{movie?.imgTitle}</p>
            <p>{movie?.time}</p>
            <p className="limit">+{movie?.limit}</p>
          </span>
          <p className='year'>{movie?.year}</p>
        </div>
        <div className="desc">
          <p style={{fontSize:"14px", fontWeight:"300", color:"lightblue"}}>{movie?.desc}</p>
        </div>
        <div className="genre">
          <p style={{fontSize:"14px", marginTop:"10px", fontWeight:"300"}}>{movie?.genre}</p>
        </div>
      </div> 
    </div>
  )
}
      
export default ListItem;

// <BsFillPlayFill onClick={togglePlayVideo} className='iconReaction' />
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRi51qrTV9u9McqebQssHiQ00Xo7WS9S5aQ&usqp=CAU