const express = require("express");
const EmployeesNames = require("../models/EmployeeName");
const RolesResponsibility = require("../models/rolesResponsibilities");
const mongoose = require("mongoose");

// Add Type
const addEmployeeName = async (req, res) => {
  try {
    const { departmentGroup, departmentType, employeeRole, location, name, email, password, isActive } = req.body;
    const newEmployeeName = new EmployeesNames({ departmentGroup, location, departmentType, employeeRole, name, email, password, isActive });
    const savedEmployeeName = await newEmployeeName.save();
    return res.json({ success: true, data: savedEmployeeName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Type
const editEmployeeName = async (req, res) => {
  try {
    const id = req.params.id;
    const { location, departmentGroup, departmentType, employeeRole, name, email, password, isActive } = req.body;

    // Update EmployeesNames collection
    const updatedEmployeeName = await EmployeesNames.findByIdAndUpdate(
      id,
      { location, departmentGroup, departmentType, employeeRole, name, email, password, isActive },
      { new: true }
    );

    if (!updatedEmployeeName) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update RolesResponsibility collection
    const updatedEmployeeRoles = await RolesResponsibility.findOneAndUpdate(
      { employeeName: id },
      { email, password, isActive },
      { new: true }
    );

    if (!updatedEmployeeRoles) {
      return res.status(404).json({ error: 'Role not found' });
    }

    console.log("updated roles", updatedEmployeeRoles);
    return res.json({ success: true, data: { updatedEmployeeName, updatedEmployeeRoles } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete Type
const deleteEmployeeName = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployeeName = await EmployeesNames.findByIdAndDelete(id);

    if (!deletedEmployeeName) {
      return res.status(404).json({ error: 'employee role not found' });
    }

    return res.json({ success: true, msg: "Employee Role Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Types
const getAllEmployeeNames = async (req, res) => {
  try {
    const employeeNames = await EmployeesNames.find().populate([
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },
      { path: 'employeeRole', select: 'EmployeeRole' },
      { path: 'location', select: 'name' },

    ]).exec();
    return res.json({ data: employeeNames });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEmployeesByRole = async (req, res) => {
  try {
    const { departmentTypeId } = req.params;

    let query = {};
    if (departmentTypeId) {
      // Convert the string to ObjectId
      const departmentTypeObjectId = new mongoose.Types.ObjectId(departmentTypeId);
      query = { 'departmentType': departmentTypeObjectId };
    }

    const employees = await EmployeesNames.find(query)
      .populate([

        { path: 'location', select: 'name' },

        { path: 'departmentGroup', select: 'name' },
        { path: 'departmentType', select: 'name' },
        { path: 'employeeRole', select: 'EmployeeRole' },
      ])
      .exec();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ error: 'No employees found for the given departmentType' });
    }

    // Count the number of employees
    const employeeCount = employees.length;

    return res.json({ success: true, data: employees, count: employeeCount, query: query });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get Specific Type
const getSpecificEmployeeName = async (req, res) => {
  try {
    const id = req.params.id;
    const employeeName = await EmployeesNames.findById(id).populate([
      { path: 'location', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },
      { path: 'employeeRole', select: 'EmployeeRole' },
      { path: 'email' },
      { path: 'password' },
    ]);

    if (!employeeName) {
      return res.status(404).json({ error: 'Emp Name not found' });
    }

    return res.json({ success: true, data: employeeName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listEmployeeNames = async (req, res) => {
  try {
    const { page, skip, per_page, sorton, sortdir, match } = req.body;

    let query = [];
    query.push(
      {
        $lookup: {
          from: "departmenttypes",
          localField: "departmentType",
          foreignField: "_id",
          as: "documentdepartmenttype"
        }
      },
      { $unwind: { path: "$documentdepartmenttype", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "employeeroles",
          localField: "employeeRole",
          foreignField: "_id",
          as: "employeeRole"
        }
      },
      { $unwind: { path: "$employeeRole", preserveNullAndEmptyArrays: true } },
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
            { name: { $regex: match, $options: "i" } },
            { "documentdepartmenttype.name": { $regex: match, $options: 'i' } },
            { "employeeRole.EmployeeRole": { $regex: match, $options: 'i' } },
            { "departmentGroup.name": { $regex: match, $options: 'i' } },
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
    // let skip = 0;
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

    const populatedList = await EmployeesNames.aggregate(query).exec(); // Add .exec() to execute the aggregation
    // const populatedList = await EmployeesNames.populate(list, [
    //   { path: 'location', select: 'name' },
    //   { path: 'departmentGroup', select: 'name' },
    //   { path: 'departmentType', select: 'name' },
    //   { path: 'employeeRole', select: 'EmployeeRole' },
    // ]);

    console.log("Query result:", populatedList);
    res.json(populatedList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};
// Assuming you have a route like this in Express.js
// app.get('/employees/:employeeId', getEmployeeByEmployeeId);


const listEmployeeNamesspec = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;
    const { departmentGroup } = req.params;

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { name: { $regex: match, $options: "i" } },
            { isActive: { $regex: match, $options: "i" } },
          ],
          departmentGroup: departmentGroup, // Filter by departmentGroup
        },
      });
    } else if (departmentGroup) {
      query.push({
        $match: {
          departmentGroup: new mongoose.Types.ObjectId(departmentGroup), // Filter by departmentGroup if provided
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

    // Aggregation to get documents and count
    const result = await EmployeesNames.aggregate([
      {
        $facet: {
          data: query.concat([
            { $project: { _id: 1 } } // Project to include only the _id field for counting
          ]),
          count: [
            { $match: { departmentGroup: new mongoose.Types.ObjectId(departmentGroup) } }, // Match the documents with the provided departmentGroup
            { $count: "total" } // Count the documents
          ]
        }
      }
    ]).exec();

    const populatedList = await EmployeesNames.populate(result[0].data, [
      { path: 'location', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },
      { path: 'employeeRole', select: 'EmployeeRole' },
    ]);

    // Combine data and count into the response object
    const response = {
      data: populatedList,
      count: result[0].count.length > 0 ? result[0].count[0].total : 0 // Get the count from the aggregation result
    };

    console.log("Query result:", response);
    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};



module.exports = {
  addEmployeeName,
  editEmployeeName,
  deleteEmployeeName,
  getAllEmployeeNames,
  getSpecificEmployeeName,
  getAllEmployeesByRole,
  listEmployeeNames,
  listEmployeeNamesspec
};