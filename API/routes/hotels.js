import express from "express";

import { countByCity,countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updatedHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../Utils/verifyToken.js";


const router =express.Router();

//create
router.post("/",verifyAdmin,createHotel)

//UPDATE

router.put("/:id",verifyAdmin, updatedHotel)

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel)

//GET

router.get("/find/:id", getHotel)

//GET ALL

router.get("/", getAllHotels)

router.get("/countByCity", countByCity)

router.get("/countByType", countByType)

router.get("/room/:id", getHotelRooms)


export default router;