import express from "express";

import web from './routes/web.js'
import cookieParser from "cookie-parser";

const app = express();

// Using middleware
// when we pass json  data through body in postman//
app.use(express.json());


app.use(cookieParser())
//using  routes
app.use("/api/v1/users",web)














export default app;