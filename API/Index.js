import express from 'express';
import dotenv from "dotenv"
import mongoose  from 'mongoose';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import paymentRoute from "./routes/payment.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app =express();
dotenv.config()
const connect=async ()=>{
try{
    await mongoose.connect(process.env.MONGO);
}
catch(error){
    throw error;
}
};
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected");
})

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use('/api/payment',paymentRoute);

app.use((err,req,res,next)=>{
const errorStatus=err.status || 500;
const errorMessage=err.message ||"Something went worng on server-side";
return res.status(errorStatus).json(
    {
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,

    }
)
})


app.listen(5000,()=>{
    connect();
    console.log("connected to backend");
})