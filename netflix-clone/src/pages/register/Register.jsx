import React from 'react'
import './register.scss';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailEmpty, setEmailEmpty] = useState("");
  const [Emailformat, setEmailformat] = useState("");
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState("");
  const [nameEmpty, setNameEmpty] = useState("");
  const [passwordlen, setPasswordLen] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const handleEmail = (e)=>{
    e.preventDefault()
    if(email === "" ){
      setEmailEmpty("Email Field cannot be empty!")
  }

  else if(!validateEmail.test(email)){
    setEmailformat("Email not valid!!")
  }
  else{
    setEmailEmpty("")
    setShowPassword((curr)=> !curr)
      console.log(email)
      console.log(name)
  }
}

  const registerCall = async()=>{
    const res = await axios.post("http://localhost:5000/api/auth/register", {name: name, email:email, password: password});
    console.log(res.data)
  }

 const handlepass = async(e)=>{
  e.preventDefault();
  if(password === ""){
    setPasswordEmpty("Password cannot be empty!")
}

  else if(name === ""){
    setNameEmpty("Name cannot be empty")
  }

  else if(password.length < 6){
    setPasswordLen("Password must be equal to or greater than 6 characters!")
  }
else{

  registerCall()
  console.log(password)
  
  setTimeout(()=>{
    navigate('/login') 
  },2000)
}
}

  const handleFocus = ()=>{
    setEmailEmpty("")
    setEmailformat("")
  }

  const handleFocus1 = ()=>{
    setPasswordEmpty("")
    setPasswordLen("")
  }

  return (
    <div>
      <div className="register">
        <div className="top">     
        <Link to={'/'}>
          <img src="/Images/logo.png" className="logo" alt=""/>
        </Link> 
        <Link to={'/login'}>
          <button className='signIn'>SignIn</button>
        </Link> 
        </div>
          <div className="container">
            <h1>Unlimited Movies, Tv Shows and more</h1>
            <h2>Watch anywhere, cancel anytime</h2>
            <p>Ready to watch, enter your email to create or restart membership</p>
            {!showPassword ? <>
             <div className="input">
             <input type="text" placeholder='username' onChange={(e)=>setName(e.target.value)} />
              <input type="email" placeholder='email address' onChange={(e)=>setEmail(e.target.value)} onFocus={handleFocus}/>
              <button onClick={handleEmail} className="registerButton">Get Started</button>        
            </div>
            {emailEmpty && <p style={{color:"red", fontSize:"14px"}}
            >{emailEmpty}</p> }
            {Emailformat && (<p style={{color:"red", fontSize:"14px"}}
            >{Emailformat}</p>) }
            </>
            : (
              <>
            <form className="input"> 
              <input type="password" placeholder='password'  onChange={(e)=> setPassword(e.target.value)} onFocus={handleFocus1}/>
                  <button onClick={handlepass} className='registerButton' >Start</button>
            </form>
            {passwordEmpty &&  <p style={{color:"red", fontSize:"14px"}}
            >{passwordEmpty}</p>}
            {passwordlen &&  <p style={{color:"red", fontSize:"14px"}}
            >{passwordlen}</p>}
            {nameEmpty &&  <p style={{color:"red", fontSize:"14px"}}
            >{nameEmpty}</p>}
            </>
            )}
          </div>
      </div>
    </div>
  )
}

export default Register;