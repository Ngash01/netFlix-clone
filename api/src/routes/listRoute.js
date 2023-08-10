import express from "express";
import List from "../models/ListModel.js";
import { VerifiedToken } from "../verifyToken.js";

const router = express.Router();

// CREATE

router.post("/", VerifiedToken, async(req, res)=>{
  if(req.authenticated.isAdmin){
    try{
      const newList = await List.create(req.body);
      res.status(200).send(newList)
    }
    catch(err){
      res.status(403).send(err)
      console.log(err)
    }
   
  }else{
    res.status(403).send("Only admins can create lists")
  }
  
})
// DELETE
router.delete('/:id', VerifiedToken, async(req, res)=>{
  if(req.authenticated.id){
    try{
      const deletedList = await List.findByIdAndDelete(req.params.id);
      res.status(200).send("List deleted successfully")
    }
    catch(err){
      console.error(err)
      res.send(err)
    }
  }else{
    res.send("Only admins allowed to delete the lists")
  }
})

// GET

router.get("/", VerifiedToken, async(req, res)=>{
    const typeQuery = req.query.type   //movies
    const genreQuery = req.query.genre //comedy
    let list =[]
    try{
      if(typeQuery){
       if(genreQuery){
        list = await List.aggregate([
          {$match : {type: typeQuery, genre: genreQuery}},
          {$sample : {size : 10}}
        ])
       } 
       else{
        list = await List.aggregate([
          {$match : {type : typeQuery}},
          {$sample : {size: 10}}
        ])
       }
    }
    else{
      list = await List.aggregate([
        {$sample : {size: 10}}
      ])
    }
    res.status(200).send(list);
  }
    catch(err){
      res.send(err)
    }
})

export default router;


