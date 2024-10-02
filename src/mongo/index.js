import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = () => {
  mongoose.set('strictQuery', false);
  mongoose.connection.once("open", () => console.log("DB connection"));
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.vulhgdz.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=APICluster`,
    { keepAlive: true }
  );
};
