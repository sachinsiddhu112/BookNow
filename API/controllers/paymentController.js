import Order from '../models/Order.js';
import Razorpay from 'razorpay';
import dotenv from "dotenv"
import crypto from "crypto";

dotenv.config()
const razorpay=new Razorpay({
    key_id:"rzp_test_N3syLFnTZSAOec",
    key_secret:process.env.RAZORPAY_SECRET
})
export const createOrder=async(req,res,next)=>{
    const {name,amount}=req.body;
    try{
       const order=await razorpay.orders.create({
        amount:Number(amount*100),
        currency:"INR"
       })

       await Order.create({
        order_id:order.id,
        name:name,
        amount:amount
       })


    
    res.status(200).json(order);
}catch(err){
    next(err)
}
}

export const paymentVerification=async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Your Razorpay secret
    const secret = process.env.RAZORPAY_SECRET;

    // Create the expected signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(razorpay_order_id + '|' + razorpay_payment_id);
    const expectedSignature = shasum.digest('hex');

    // Compare the signatures
    if (expectedSignature === razorpay_signature) {
        // Fetch payment details from Razorpay API for further validation
        

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        instance.payments.fetch(razorpay_payment_id)
            .then(payment => {
                // Check payment status and other details if necessary
                if (payment.status === 'captured') {
                    res.status(200).json({ success: true, payment });
                } else {
                    res.json({ success: false, message: 'Payment not captured' });
                }
            }).catch(error => {
                res.json({ success: false, message: 'Error fetching payment details', error });
            });
    } else {
        res.json({ success: false, message: 'Invalid signature' });
    }
};
