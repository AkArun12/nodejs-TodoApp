import express from "express";
import  taskRouter from './routes/task.js'

import userRouter from './routes/web.js'
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

// Using middleware
// when we pass json  data through body in postman//
app.use(express.json());


app.use(cookieParser())
//using  routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)


// uisng error middleware
app.use(errorMiddleware)




export default app;