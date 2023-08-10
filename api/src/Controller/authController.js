import mongoose from "mongoose";
import User from "../models/UserModel.js";
import CryptoJS from "crypto-js";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import createToken from "../verifyToken.js";

// Create
export const createRegister = async(req,res)=>{
  try{
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
      profilepic: req.body.profilepic,
      isAdmin: true
    })
    res.status(200).send("user added successfully")  
  }
  catch(err){
    console.error(err);
    res.status(500).send(err)
  }
}

// fetch all

export const fetchAll = async(req, res)=>{
  const all = await User.find();
  res.status(200).json(all);
}

// login

export const login = async(req, res)=>{
  try{
    const user = await User.findOne({
      email: req.body.email
    })
    if(!user){
      res.status(400).send("Email does not exist")
    }
    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

     if(originalPassword !== req.body.password){
      res.status(400).send("Wrong password!")
    }
    else{

      const {password, ...info} = user._doc;

      const accessToken = createToken(user)

      res.status(200).json({res:"User logged in successfully!!",info, accessToken});
    }
    
  }
  catch(err){
    res.status()
    console.error(err)
  }
}

