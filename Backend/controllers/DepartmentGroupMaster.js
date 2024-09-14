const express = require("express");
const DepartmentGroup = require("../models/DepartmentGroupMaster");
const DepartmentType=require("../models/DepartmentType");
const EmployeeRole=require("../models/EmployeesRole");
const EmployeeName=require("../models/EmployeeName")
// Add Location
const addDepartmentGroup = async (req, res) => {

  try {
    const { name, isActive } = req.body;
    console.log(req.body);
    const newDepartmentGroup = new DepartmentGroup({ name, isActive });
    const savedDepartmentGroup = await newDepartmentGroup.save();
    return res.json({ success: true, data: savedDepartmentGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Location
const editDepartmentGroup = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, isActive } = req.body;

    const updatedDepartmentGroup = await DepartmentGroup.findByIdAndUpdate(
      id,
      { name, isActive },
      { new: true }
    );

    if (!updatedDepartmentGroup) {
      return res.status(404).json({ error: "group not found" });

    }

    return res.json({ success: true, data: updatedDepartmentGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Location
const deleteDepartmentGroup = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDepartmentGroup = await DepartmentGroup.findByIdAndDelete(id);

    if (!deletedDepartmentGroup) {
      return res.status(404).json({ error: "group not found" });
    }
    await DepartmentType.deleteMany({ departmentGroup: id });
    await EmployeeRole.deleteMany({ departmentGroup: id });
    await EmployeeName.deleteMany({ departmentGroup: id });
    return res.json({
      success: true,
      msg: "Department Group Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Locations
const getAllDepartmentGroup = async (req, res) => {
  try {
    const departmentGroup = await DepartmentGroup.find()
      .exec();
    return res.json({ data: departmentGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listDepartmentGroup = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;
    console.log("Request body:", req.body);

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { name: { $regex: match, $options: "i" } }, // Adjust based on your field names
            { isActive: { $regex: match, $options: "i" } }, // Adjust based on your field names
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

    const list = await DepartmentGroup.aggregate(query);
    console.log("Query result:", list);
    res.json(list);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports = { listDepartmentGroup };

// Get Specific Location
const getSpecificDepartmentGroup = async (req, res) => {
  try {
    const id = req.params.id;
    const departmentGroup = await DepartmentGroup.findById(id);

    if (!departmentGroup) {
      return res.status(404).json({ error: "group not found" });
    }

    return res.json({ success: true, data: departmentGroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addDepartmentGroup,
  editDepartmentGroup,
  deleteDepartmentGroup,
  getAllDepartmentGroup,
  getSpecificDepartmentGroup,
  listDepartmentGroup,
};
