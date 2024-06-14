import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema({
    name:{
        type:String
    },
    amount:{
        type:Number
    },
    order_id:{
         type:String
    },
    razorpay_payment_id:{
        type:String,
        default:null
    },
    razorpar_order_id:{
        type:String,
        default:null
    },
    razorpay_signature:{
         type:String,
         default:null
    }


})

export default mongoose.model("Order",OrderSchema);