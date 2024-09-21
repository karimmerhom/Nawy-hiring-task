import mongoose from "mongoose";

const mongoURI: string | undefined = process.env.MONGODB_URI;

export const connectDB = async (): Promise<void> => {
  if (!mongoURI) {
    console.error("MongoDB URI not found in environment variables.");
    throw new Error("MongoDB URI not set in environment variables");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected…");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
