import express from "express";
import  taskRouter from './routes/task.js'
import cors from 'cors';
import dotenv from "dotenv";


import userRouter from './routes/web.js'
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({
  path: "./config.env",
});


//****** */ Using middleware
// when we pass json  data through body in postman//
app.use(express.json());
app.use(cookieParser())
//using  routes middleware
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)

// uisng error middleware
app.use(errorMiddleware)

// using cors middleware for deployment purpose
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))




export default app;