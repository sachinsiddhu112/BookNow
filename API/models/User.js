import mongoose, { Mongoose, mongo } from "mongoose";


const UserSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        required:false
    },
},
{timestamps:true}
)

export default mongoose.model("User",UserSchema);