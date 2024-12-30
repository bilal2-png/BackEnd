import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connect to MongoDB database
const connectDB = async function dbConnection() {
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL || !DB_NAME) {
        console.error("Missing MongoDB connection information (MONGODB_URL or DB_NAME)");
        process.exit(1);
    }

    try {
        const connectionInstance = await mongoose.connect(`${mongoURL}/${DB_NAME}`);
        console.log(`\nConnected to MongoDB at ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;
