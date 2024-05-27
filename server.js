const express=require("express");
const bcrypt=require("bcryptjs");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const connectDB = require("./config/db");

const app=express();

///config()
dotenv.config();

////routes


const userRouter=require("./routes/userRoutes");
const blogRouter=require("./routes/blogRoutes");

connectDB();




////middlewares

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));





////routes  in api


app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);





 const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`mongoose running at ${PORT}`)
})