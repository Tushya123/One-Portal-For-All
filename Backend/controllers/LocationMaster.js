const express = require("express");
const Location = require("../models/LocationMaster");
const EmployeeName=require("../models/EmployeeName")
// Add Location
const addLocation = async (req, res) => {
    try {
      const { name, isActive } = req.body;
      const newLocation = new Location({ name, isActive });
      const savedLocation = await newLocation.save();
      res.json({success : true , data : savedLocation});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Location
  const editLocation = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { name, isActive } = req.body;
  
      const updatedLocation = await Location.findByIdAndUpdate(
        id,
        { name, isActive },
        { new: true }
      );
  
      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.json({success:true, data : updatedLocation});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Location
  const deleteLocation = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedLocation = await Location.findByIdAndDelete(id);
  
      if (!deletedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
      //await DepartmentType.deleteMany({ departmentGroup: id });
      res.json({success : true , msg:"Location Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Locations
  const getAllLocations = async (req, res) => {
    try {
      const locations = await Location.find().exec();
      res.json({data:locations});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Location
  const getSpecificLocation = async (req, res) => {
    try {
      const  id  = req.params.id;
      const location = await Location.findById(id);
  
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.json({success : true , data:location});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const listLocation = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
      console.log("Request body:", req.body);
  
      let query = [];
  
      // Handle match parameter
      if (match) {
        query.push({
          $match: {
            $or: [
              { name: { $regex: match, $options: "i" } },
              { isActive: { $regex: match, $options: "i" } },
            ],
          },
        });
      }
  
      // Optionally sort documents
      let sort = {};
      if (sorton && sortdir) {
        sort[sorton] = sortdir === "desc" ? -1 : 1;
      } else {
        sort = { name: 1 }; // Adjust based on your field names
      }
      query.push({ $sort: sort });
  
      // Optionally skip and limit documents for pagination
      let skip = 0;
      if (page !== undefined && per_page !== undefined) {
        skip = (page - 1) * per_page;
        query.push({ $skip: skip });
        query.push({ $limit: per_page });
      }
  
      const list = await Location.aggregate(query);
      console.log("Query result:", list);
      res.json(list);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = {
    addLocation,
    editLocation,
    deleteLocation,
    getAllLocations,
    getSpecificLocation,
    listLocation,
  };