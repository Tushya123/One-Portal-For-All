const express = require("express");
const MenuMaster=require("../models/MenuMaster")
const addMenuMaster = async (req, res) => {
    try {
      const { menugroup,menuname, isActive } = req.body;
      // console.log(req.body);
      const newMenuMaster = new MenuMaster({ menugroup,menuname,isActive });
      const savedMenuMaster = await newMenuMaster.save();
      return res.json({success : true , data : savedMenuMaster});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAllMenuMaster = async (req, res) => {
    try {
      const menu = await MenuMaster.find().exec();
       return res.json({data:menu});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteMenuMaster = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedMenuMaster = await MenuMaster.findByIdAndDelete(id);
  
      if (!deletedMenuMaster) {
        return res.status(404).json({ error: 'group not found' });  
      }
  
       return res.json({success : true , msg:"Menu Master Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getSpecificMenuMaster = async (req, res) => {
    try {
      const  id  = req.params.id;
      const menumaster1 = await MenuMaster.findById(id);
  
      if (!menumaster1) {
        return res.status(404).json({ error: 'group not found' });
      }
  
     return res.json({success : true , data:menumaster1});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const editMenuMaster = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { menugroup,menuname,isActive } = req.body;
  
      const updatedDepartmentGroup = await MenuMaster.findByIdAndUpdate(
        id,
        { menugroup,menuname, isActive },
        { new: true }
      );
  
      if (!updatedDepartmentGroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success:true, data : updatedDepartmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const listMenuMaster = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
      console.log("Request body:", req.body);
  
      let query = [];
  
      // Handle match parameter
      if (match) {
        query.push({
          $match: {
            $or: [
              { menugroup: { $regex: match, $options: "i" } },
              { menuname: { $regex: match, $options: "i" } },
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
  
      const list = await MenuMaster.aggregate(query);
      console.log("Query result:", list);
      res.json(list);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = {
    addMenuMaster,
    getAllMenuMaster,
    deleteMenuMaster,
    getSpecificMenuMaster,
    editMenuMaster,
    listMenuMaster
  };