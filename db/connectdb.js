import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "backendapi",
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database Connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
