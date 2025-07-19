import mongoose from "mongoose";
const connection=async()=>{
    try{
        await mongoose.connect("mongodb+srv://vijaynimar8:yeGWro1kXFYN9keU@chatboat.irtnpg6.mongodb.net/?retryWrites=true&w=majority&appName=chatBoat")
        console.log("connected to chatBoat database");
    }catch(err){
        console.log("error in mongoDb connection");
    }
}
export default connection