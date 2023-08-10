import { useContext } from 'react';
import { AuthContext } from './authContext/authContext';

import './App.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"

function App() {
  const {user} = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/'  element={user ? <Home/> : <Navigate to={'/register'}/> }/>
          <Route path="/movies"  element={!user ? <Navigate to={'/register'}/>: <Home type="movies"/>}/>
          <Route path="/series" element={!user ? <Navigate to={'/register'}/>: <Home type="series"/>}/>
          <Route path='/watch' element={!user ? <Navigate to={'/register'}/> : <Watch/>}/>
          <Route path='/register' element={ <Register/>}/>
          <Route path='/login' element={!user ? <Login/> : <Navigate to={'/'}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
