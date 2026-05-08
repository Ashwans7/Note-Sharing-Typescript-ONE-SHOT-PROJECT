import mongoose from "mongoose";
import envConfig from "./config.js";


const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(envConfig.mongodbString as string)
        console.log("Connected to db successfully")
    } catch (error) {
        console.log("Failed to connect to db !!!", error)
        process.exit(1)
    }
}

export default connectToDatabase