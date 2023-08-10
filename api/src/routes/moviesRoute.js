import express from "express";
import Movie from "../models/MovieModel.js";
import { VerifiedToken } from "../verifyToken.js";


const router = express.Router();

// CREATE

router.post("/", VerifiedToken, async(req, res)=>{
  if(req.authenticated.isAdmin){
    const newMovie = new Movie(req.body)

    try{
      const savedMovie = await newMovie.save();
      res.status(200).json({res:"movie created successfully", Movieid:savedMovie._id})
    }
    catch(err){
      res.status(401).send(err);
    }
  }
  else if(err){
    res.send(err)
  }
})

// UPDATE
router.put('/:id', VerifiedToken, async(req, res)=>{
  if(req.authenticated.isAdmin){    
    try{
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
        $set:req.body
      }, {
        new: true
      });
      res.status(200).send(updatedMovie)
    }
    catch(err){
      res.status(500).send(err)
    }
  }
  else{
    return (
    res.status(403).send("Only Admins can create movies in the database")
    )
  }
})


// DELETE
router.delete('/:id', VerifiedToken, async(req, res)=>{
  if(req.authenticated.isAdmin){    
    try{
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
      res.status(200).send("The movie has been deleted!...")
    }
    catch(err){
      res.status(500).send(err)
    }
  }
  else{
    return (
    res.status(403).send("Only Admins can create movies in the database")
    )
  }
})

// GET

router.get("/find/:id", VerifiedToken, async(req,res)=>{
    try{
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    }
    catch(err){
      console.log(err)
    }
  }
)

// GET RANDOM

router.get("/random", VerifiedToken, async(req,res)=>{
  const type = req.query.type;
 try{
  let movie;
  if(type === "Series"){
     movie = User.aggregate([
      {$match : {isSeries: true}},
      {$sample : {size: 1}}
    ])
  }
  else{
     movie = await Movie.aggregate([
      {$match :{isSeries : false}},
      {$sample :{size:1}}
    ])
  }
  res.status(200).send(movie)
 }
 catch(err){
  res.status(400).send(err)
 }
})

// Get All
router.get('/', VerifiedToken, async(req, res)=>{
  if(req.authenticated.isAdmin){    
    try{
      const allMovies = await Movie.find()
      res.status(200).json({response: "All Movies", allMovies});
    }


    catch(err){
      res.status(500).send(err)
    }
  }
  else{
    return (
    res.status(403).send("Only Admins can create movies in the database")
    )
  }
})



export default router;
