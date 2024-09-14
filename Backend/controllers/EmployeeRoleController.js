const express = require("express");
const EmployessRoles = require("../models/EmployeesRole");

// Add Type
const addEmployeeRole = async (req, res) => {
  try {
    const { departmentGroup, departmentType, EmployeeRole, isActive } = req.body;
    const newEmployeeRole = new EmployessRoles({ departmentGroup, departmentType, EmployeeRole, isActive });
    const savedEmployeeRole = await newEmployeeRole.save();
    return res.json({ success: true, data: savedEmployeeRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Type
const editEmployeeRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { departmentGroup, departmentType, EmployeeRole, isActive } = req.body;

    const updatedEmployeeRole = await EmployessRoles.findByIdAndUpdate(
      id,
      { departmentGroup, departmentType, EmployeeRole, isActive },
      { new: true }
    );

    if (!updatedEmployeeRole) {
      return res.status(404).json({ error: 'Type not found' });
    }

    return res.json({ success: true, data: updatedEmployeeRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Type
const deleteEmployeeRole = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployeeRole = await EmployessRoles.findByIdAndDelete(id);

    if (!deletedEmployeeRole) {
      return res.status(404).json({ error: 'employee role not found' });
    }

    return res.json({ success: true, msg: "Employee Role Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Types
const getAllEmployeeRoles = async (req, res) => {
  try {
    const employeeRoles = await EmployessRoles.find()
      .populate([
        { path: 'departmentGroup', select: 'name isActive' },
        { path: 'departmentType', select: 'name isActive' },
      ])
      .exec();

    return res.json({ data: employeeRoles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeRolesByDepartmentType = async (req, res) => {
  try {
    const departmentTypeId = req.params.departmentTypeId; // Extract departmentType ID from the request parameters

    const employeeRoles = await EmployessRoles.find({ departmentType: departmentTypeId })
      .populate([
        { path: 'departmentGroup', select: 'name isActive' },
        { path: 'departmentType', select: 'name isActive' },
      ])
      .exec();

    return res.json({ data: employeeRoles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Specific Type
const getSpecificEmployeeRole = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeRole = await EmployessRoles.findById(id).populate([
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },
    ]);

    if (!employeeRole) {
      return res.status(404).json({ error: 'Emp Role not found' });
    }

    return res.json({ success: true, data: employeeRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeRolesByGroupAndType = async (req, res) => {
  try {
    const departmentGroupId = req.params.departmentGroupId;
    const departmentTypeId = req.params.departmentTypeId;

    const employeeRoles = await EmployessRoles.find({
      departmentGroup: departmentGroupId,
      departmentType: departmentTypeId,
    })
      .populate([
        { path: 'departmentGroup', select: 'name' },
        { path: 'departmentType', select: 'name' },
      ])
      .exec();

    return res.json({ data: employeeRoles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const listEmployeeRoles = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;

    let query = [];
    query.push(
      {
        $lookup: {
          from: "departmenttypes",
          localField: "departmentType",
          foreignField: "_id",
          as: "departmentType"
        }
      },
      { $unwind: { path: "$departmentType", preserveNullAndEmptyArrays: true } },)
    query.push(
      {
        $lookup: {
          from: "departmentgroups",
          localField: "departmentGroup",
          foreignField: "_id",
          as: "departmentGroup"
        }
      },
      { $unwind: { path: "$departmentGroup", preserveNullAndEmptyArrays: true } },)
    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { "departmentType.name": { $regex: match, $options: 'i' } },
            { "departmentGroup.name": { $regex: match, $options: 'i' } },
            { EmployeeRole: { $regex: match, $options: "i" } },
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
      sort = { EmployeeRole: 1 }; // Adjust based on your field names
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }
    query.push(
      {
        $facet: {
          count: [{ $count: "total" }],
          data: [
            { $skip: skip },
            { $limit: per_page },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$count.total", 0] },
          data: 1,
        },
      }
    );
    const populatedList = await EmployessRoles.aggregate(query).exec(); // Add .exec() to execute the aggregation
    // const populatedList = await EmployessRoles.populate(list, [
    //   { path: 'departmentGroup', select: 'name' },
    //   { path: 'departmentType', select: 'name' },
    // ]);
    console.log("Query result:", populatedList);
    res.json(populatedList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = {
  addEmployeeRole,
  editEmployeeRole,
  deleteEmployeeRole,
  getAllEmployeeRoles,
  getSpecificEmployeeRole,
  getEmployeeRolesByGroupAndType,
  getEmployeeRolesByDepartmentType,
  listEmployeeRoles,
};