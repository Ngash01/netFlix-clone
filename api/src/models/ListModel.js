import mongoose from "mongoose";

const ListSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true
  },
  type:{
    type:String
  },
  content:{
    type:Array
  },
  genre:{
    type:String
  }
},
{
  timestamps: true
}
);

const List = mongoose.model("List", ListSchema);
export default List;