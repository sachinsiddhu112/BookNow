import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoomAvailability, updatedRoom } from "../controllers/roomsController.js";
import { verifyAdmin } from "../Utils/verifyToken.js";

const router =express.Router();

router.post("/:hotelId",verifyAdmin,createRoom)

//UPDATE

router.put("/:id",verifyAdmin, updatedRoom)

router.put("/availability/:id", updateRoomAvailability)

//DELETE
router.delete("/:id/:hotelId",verifyAdmin, deleteRoom)

//GET

router.get("/:id", getRoom)

//GET ALL

router.get("/", getAllRooms)
export default router;