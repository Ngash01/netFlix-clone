import jwt from "jsonwebtoken";
import "dotenv/config";

const createToken = (user)=>{
  const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, 
    process.env.SECRET_KEY)
    return accessToken;
    // console.log(accessToken)
}

export const VerifiedToken = (req,res, next)=>{
  const AuthHeaders = req.headers.token;
  if(AuthHeaders){
    const token = AuthHeaders.split(" ")[1]

    // console.log(token);

  const verify = jwt.verify(token, process.env.SECRET_KEY,(err, user)=>{
      if(err){
        res.status(403).send("Token is not valid!")
      }
      else{
        req.authenticated = user;
        next();
      }
    })
  }

  else{
    return res.status(401).send("User Not Authenticated!")
  }
}

export default createToken;

