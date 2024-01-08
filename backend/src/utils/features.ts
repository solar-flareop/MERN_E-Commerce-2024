import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv:///?retryWrites=true&w=majority"
    );
    console.log(`Connected to DB host : ${connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
