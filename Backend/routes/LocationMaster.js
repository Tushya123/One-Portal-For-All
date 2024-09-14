const express = require("express");
const { addLocation, getAllLocations, getSpecificLocation, deleteLocation, editLocation, listLocation } = require("../controllers/LocationMaster");

const router = express.Router();


// Routes
router.post("/addlocation" , addLocation);
router.get("/getlocations" , getAllLocations);
router.post("/getlistlocation" , listLocation);
router.post("/getlocationbyid/:id",getSpecificLocation);
router.post("/editlocation/:id",editLocation);
router.post("/deletelocationbyid/:id",deleteLocation);


module.exports = router;