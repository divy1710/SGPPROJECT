import express from 'express';
import dotenv from "dotenv"
import connectDB from './db.js';
import cors from "cors"
import userroute from "./routes/userroute.js"
import questionroute from "./routes/questionRoutes.js"
import cookieParser from 'cookie-parser';

dotenv.config({})

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());

app.use('/api/v1/user',userroute)
app.use('/api/v1/question',questionroute)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port : ${PORT}`);
})