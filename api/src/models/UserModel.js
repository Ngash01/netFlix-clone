import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    unique:true,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true
  },
  profilePic:{
    type:String,
    default:""
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},
{
  timestamps: true
}
);

const User = mongoose.model("User", UserSchema);
export default User;