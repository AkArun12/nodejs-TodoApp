import app from "./app.js";
import dotenv from 'dotenv'
import connectDB from "./db/connectdb.js";

dotenv.config({
    path:"./config.env"

})

const DATABASE_URL = process.env.MONGO_URI;

// Connecting database
connectDB(DATABASE_URL);


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});