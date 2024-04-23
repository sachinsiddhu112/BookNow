import express from "express";
import { deleteUser, getAllUsers, getUser, updatedUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/verifyToken.js";

const router =express.Router();


// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user you are authenticated");
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user you are logged in and you can delete your account");
// })

// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello you are admin.");
// })
//UPDATE

router.put("/:id",verifyUser, updatedUser)

//DELETE
router.delete("/:id",verifyUser, deleteUser)

//GET

router.get("/:id",verifyUser, getUser)

//GET ALL

router.get("/",verifyAdmin, getAllUsers)

export default router;