import express from 'express';
import { createOrder, paymentVerification } from '../controllers/paymentController.js';


const router=express.Router();

router.post("/checkout",createOrder);
router.post("/payment-verification",paymentVerification)




export default router;