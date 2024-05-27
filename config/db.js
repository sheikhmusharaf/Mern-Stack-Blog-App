const mongoose=require("mongoose");
const connectDB=async()=>{
    try{

    
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoose connection at ${mongoose.connection.host} at ${process.env.DEV_MODE}`)
    }
    catch(err){
        console.log(err)
        console.log("error in connction");
    }
}
module.exports=connectDB;
