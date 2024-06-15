import express from "express";
import { deleteUser, getAllUsers, getUser, updatedUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/verifyToken.js";

const router =express.Router();


 
router.put("/:id",verifyUser, updatedUser)

//DELETE
router.delete("/:id",verifyUser, deleteUser)

//GET

router.get("/:id",verifyUser, getUser)

//GET ALL

router.get("/",verifyAdmin, getAllUsers)

export default router;