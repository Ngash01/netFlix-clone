import express  from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import Auth from './routes/authRoutes.js';
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/usersRoute.js"
import movieRoutes from "./routes/moviesRoute.js"
import ListRoutes from "./routes/listRoute.js"


const app = express();

app.use(bodyParser.json());
app.use(cors())

const mongodb_url = process.env.MONGO_URL

app.get('/', (req,res)=>{
  res.status(200).send("rest api init")
});


app.use('/api/auth', Auth)
app.use('/users', userRoutes)
app.use('/movies', movieRoutes)
app.use("/lists", ListRoutes)


mongoose.connect(mongodb_url)
.then(()=>{
  console.log("Connection with database established")
  app.listen(5000, console.log("server running on http://localhost:5000"));
})
.catch((err)=>{ 
  console.error(err)
})


