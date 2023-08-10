import React, { useContext, useEffect, useState } from 'react'
import "./navbar.scss"
import {AiOutlineSearch} from "react-icons/ai";
import {AiOutlineBell} from "react-icons/ai";
import {BiSolidDownArrow} from "react-icons/bi";
import { Link } from 'react-router-dom';
import { logoutStart } from '../../authContext/authActions';
import { AuthContext } from '../../authContext/authContext';

const Navbar = () => {

  const {isFetching, dispatch} = useContext(AuthContext)

  const Top_Offset =  200;

  const [showDropDown, setShowDropDown] = useState(false)
  const [DarkDisplay, setDarkDisplay] = useState(false)


const toggleDropDown = ()=>{
  setShowDropDown((curr)=> curr === false ? true : false)
} 

useEffect(()=>{
  const handleScroll = (()=>{
  if(window.scrollY >= Top_Offset){
    setDarkDisplay(true)  
  }else{
    setDarkDisplay(false)
  }
},[])

window.addEventListener("scroll", handleScroll)
 return()=>{
   window.removeEventListener("scroll", handleScroll)
 }
},[DarkDisplay])

  const handleLogout = (e)=>{
    e.preventDefault()
    dispatch(logoutStart())
  }

  return (
    <div className='Container' style={{backgroundColor: `${DarkDisplay ? "black":""}`,
     transition:"ease-in-out 500ms", color: `${DarkDisplay ? "white":"black"}`, transition:"ease-in-out 500ms",
      fontWeight: `${DarkDisplay ? "": "500"}`}} >
       <div className='wrapper'>
        <img className='logoImg' src="/Images/logo.png" alt="" />
        <div className='right-side'>
            <ul className='rightList1'>
              <Link to='/'>
                <li>Homepage</li>
              </Link>
              <Link to='/series'>
                <li className='navbarMainLists'>Series</li> 
              </Link>
              <Link to='/movies'>
                <li  className='navbarMainLists'>Movies</li>
              </Link>
                <li>New and Popular</li>
              <Link>
                <li>My List</li>
              </Link>
            </ul>

          <ul className='rightList2'>
            <li><AiOutlineSearch/></li>
            <li>KID</li>
            <li><AiOutlineBell/></li>
            <li><img src="/Images/default-blue.png" style={{width:"40px", height:"40px", borderRadius:"10px"}} alt="" /></li>
            <li><BiSolidDownArrow onClick={toggleDropDown}/></li>
          </ul>

        </div>
        {showDropDown && <div className='showDropDown'>
          <p className='settings'>Settings</p>
          <p className='logout' onClick={handleLogout}>Logout</p>
        </div>}
       </div>
    </div>
  )
}

export default Navbar;