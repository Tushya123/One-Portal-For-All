const express = require("express");
const DepartmentType = require("../models/DepartmentType");
const AddTask=require("../models/AddTaskModel")
// Add Type
const addDepartmentType = async (req, res) => {
    try {
      const { departmentGroup , name, isActive } = req.body;
      const newDepartmentType = new DepartmentType({ departmentGroup ,name, isActive });
      const savedDepartmentType = await newDepartmentType.save();
      return res.json({success : true , data : savedDepartmentType});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Type
  const editDepartmentType = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { departmentGroup,name, isActive } = req.body;
  
      const updatedDepartmentType = await DepartmentType.findByIdAndUpdate(
        id,
        {departmentGroup, name, isActive },
        { new: true }
      );
  
      if (!updatedDepartmentType) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
       return res.json({success:true, data : updatedDepartmentType});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Type
  const deleteDepartmentType = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedDepartmentType = await DepartmentType.findByIdAndDelete(id);
  
      if (!deletedDepartmentType) {
        return res.status(404).json({ error: 'group not found' });
      }
       
       return res.json({success : true , msg:"Department Group Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Types
  const getAllDepartmentType = async (req, res) => {
    try {
      const departmentType = await DepartmentType.find()
        .populate('departmentGroup', 'name isActive')
        .exec();
  
      return res.json({ data: departmentType });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   
  const getalldtype = async (req, res) => {
    try {
        const departmentType = await DepartmentType.find()
            .populate('departmentGroup', 'name')
            .exec();

        const departmentTypeWithTaskNames = await Promise.all(
            departmentType.map(async (item) => {
                const tasks = await AddTask.find({ departmentType: item._id });
                const taskNames = tasks.map(task => task.taskName);
                return { departmentType: item, taskNames };
            })
        );

        return res.json({ data: departmentTypeWithTaskNames });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




  // Get Specific Type
  const getSpecificDepartmentType = async (req, res) => {
    try {
      const id = req.params.id;
      const departmentType = await DepartmentType.findById(id)
        .populate('departmentGroup', 'name')
        .exec();
  
      if (!departmentType) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
      return res.json({ success: true, data: departmentType });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getDepartmentTypesByGroupId = async (req, res) => {
    try {
      const departmentGroupId = req.params.id;
  
      const departmentTypes = await DepartmentType.find({ departmentGroup: departmentGroupId })
        .populate('departmentGroup', 'name')
        .exec();
  
      return res.json({ data: departmentTypes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const listDepartmentType = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
  
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
  
      const list = await DepartmentType.aggregate(query).exec(); // Add .exec() to execute the aggregation
      const populatedList = await DepartmentType.populate(list, {
        path: 'departmentGroup',
        select: 'name',
      });
  
      console.log("Query result:", populatedList);
      res.json(populatedList);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  };
  
  
  
  
  module.exports = {
    addDepartmentType,
    editDepartmentType,
    deleteDepartmentType,
    getAllDepartmentType,
    listDepartmentType, 
    getSpecificDepartmentType,
    getDepartmentTypesByGroupId,
    getalldtype,
  };