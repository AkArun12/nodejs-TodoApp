import app from "./app.js";

import connectDB from "./db/connectdb.js";

const DATABASE_URL = process.env.MONGO_URL;

// Connecting database
connectDB(DATABASE_URL);

const PORT = process.env.PORT;
app.listen(PORT, () => {
 
  console.log(`Server started on port http://localhost:${PORT} `);
});
