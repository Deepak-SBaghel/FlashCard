import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGODB_URL);

const connectDb = async () => {
  try {
    //mongoose.connect(uri, options) returns a promise , option is optional and used for configuration
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

// same with Promise syntax (Just for reference)
// const connectDb = mongoose
//   .connect(process.env.MONGODB_URL, {})
//   .then(() => console.log("sucessfull"))
//   .catch((err) => {
//     console.error("failure" + err.message);
//     process.exit(1);
//   });

export default connectDb;
