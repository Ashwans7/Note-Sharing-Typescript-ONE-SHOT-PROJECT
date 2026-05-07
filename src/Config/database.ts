import mongoose, { mongo }  from "mongoose";
import envConfig from "./config.js";
 

const connectToDatabase =async ()=>{
    try{
        await mongoose.connect(envConfig.mongodbstring as string)
        mongoose.connection.on('connected',()=>{
            console.log("connected to database")
        })
    }catch (error){
        console.log("failed to connect to database")
        process.exit(1)
    }
   
}

export default connectToDatabase