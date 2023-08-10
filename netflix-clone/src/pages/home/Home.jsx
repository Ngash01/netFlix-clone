import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get("https://netflix-clone-frontend-bo9q.onrender.com/lists", {
        headers :{
          token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYwOGU0YTVhMzdhZTFhYjYzZmRmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTQ3MTcyN30.PI5BRgrG-34JsSjibl-97sXWMd4j_VvIX9-KxYNser4"
        }
      })
      setLists(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])
  

  return (
    <div className='home'>
      <Navbar/>
      <Featured type={type}/>
      {lists.map((list)=>{
        return <List list={list} key={list._id}/>
      })}
      {/* <List topic="Continue to watch"/>
      <List topic="Trending Now"/> */}
    </div>
  )
}

export default Home;