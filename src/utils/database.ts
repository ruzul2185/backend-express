import { connect } from "mongoose";

const connnectDatabase = async () => {
  try {
    if (!process.env.MONGO_URL) throw new Error("Mongodb URL missing!");
    const connection = await connect(process.env.MONGO_URL);
    console.log("Connection successful!");
  } catch (error) {
    console.log(error);
  }
};

export default connnectDatabase;
