import express from "express";
import CryptoJS from "crypto-js";
import User from "../models/UserModel.js";
import { VerifiedToken } from "../verifyToken.js";


const router = express.Router();

// UPDATE
router.put('/update/:id', VerifiedToken, async(req, res)=>{
  if(req.authenticated.id === req.params.id ){
    if(req.body.password){
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new: true}
      )
      res.status(200).send(updatedUser)
    }
    catch(err){
      res.status(500).send(err)
    }
  }
  else{
    return (
    res.status(403).send("You can only Update your account!")
    )
  }
})

// GET
router.get('/find/:id', async(req, res)=>{
    try{
      const userInfo = await User.findById(req.params.id);

      const {password, ...moreInfo} = userInfo._doc
      res.status(200).json(moreInfo)
    }
    catch(err){
      res.status(500).send(err)
    }
  }
  
)

// GET ALL
router.get('/', VerifiedToken, async(req, res)=>{
  const query = req.query.new;
  if(req.authenticated.isAdmin){
    try{
      const users = query ? await User.find().sort({id:-1}).limit(2): await User.find();
      res.status(200).send(users)
    }
    catch(err){
      res.status(401).send("error")
    }
  }else{
    res.status(401).send("Only Admins cn see all users")
  }
})


// DELETE

router.delete("/delete/:id", VerifiedToken, async(req,res)=>{
  if(req.authenticated.id === req.params.id){
    try{
      const Delete = await User.findByIdAndDelete(req.params.id);
      res.send("User deleted from the database");
    }
    catch(err){
      console.log(err)
    }
  }
  else{
    res.status(500).send("You can only delete your posts");
  }
})

// GET USER STATS
router.get("/stats", async(req, res)=>{
  const today = new Date();
  console.log(today)
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  console.log(lastYear)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    'November',
    "December"
  ]


  try{
    const data = await User.aggregate([
      {
        $project:{    
          month:{$month: "$createdAt"}
        }
      },{
        $group:{
          _id: "$month",
          total:{$sum:1}
        }
      }
    ]);
    res.status(200).send(data)

  }
  catch(err){
    res.status(500).send(err)
  }
})

export default router;