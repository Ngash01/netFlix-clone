import React, { useContext, useState } from 'react';
import "./login.scss";
import { Link } from 'react-router-dom';
import { LoginCall } from '../../apiCalls/apiCalls';
import { AuthContext } from '../../authContext/authContext';


const Login = () => {

  const {isFetching, dispatch} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e)=>{
    e.preventDefault();
    LoginCall({email, password}, dispatch)
  }
  return (
    <div className='login'>
     
          <div className='topfeaures'>
            <Link to={'/'}>
             <img className='logo' src="/Images/logo.png" style={{cursor:"pointer"}} alt="" />
            </Link>
            <div className="container">
              <form action="" className='Form'>
                <h1>Sign In</h1>
                <input type="email" placeholder='email or phone Number' onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
                <button className='loginButton' onClick={handleLogin} disabled={isFetching}>Sign In</button>
                <span>New To NetFlix? <Link to={'/register'}><b> Sign Up Now</b></Link></span>
              </form>
            </div>
          </div>
         
      </div>
  )
}

export default Login;