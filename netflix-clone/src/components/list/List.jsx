import React, { useRef } from 'react';
import './list.scss';
import {AiOutlineArrowLeft} from "react-icons/ai"
import {AiOutlineArrowRight} from "react-icons/ai"
import ListItem from '../listItem/ListItem';
import { useState } from 'react';

const List = ({list}) => {

  const [slideNumber, setSlideNumber] = useState(0)

  const listRef = useRef();
  // console.log(listRef)
  // console.log(list.content)

  const handleClick = (direction)=>{
    let distance = listRef.current.getBoundingClientRect().x-50
    if(direction === "left" && slideNumber>0){
      listRef.current.style.transform = `translateX(${230 + distance}px)`
      setSlideNumber(slideNumber -1)
    }
    // console.log(distance)

    if(direction === "right" && slideNumber<5){
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
      setSlideNumber(slideNumber +1)
    }
  }

  return (
    <div className='list'>
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <AiOutlineArrowLeft className='arrowIcon left' onClick={()=>handleClick("left")}/>
        <div className='container' ref={listRef}>
          {list.content.map((listItem)=>{
            return <ListItem item={listItem} key={listItem._id}/>
          })}
        </div> 
        <AiOutlineArrowRight  className='arrowIcon right'  onClick={()=>handleClick("right")}/> 
      </div> 
    </div>
  )
}

export default List;