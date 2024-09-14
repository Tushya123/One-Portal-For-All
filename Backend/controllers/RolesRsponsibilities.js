const express = require("express");
// const DepartmentGroup = require("../models/DepartmentGroupMaster");
const RolesResponsibilities = require("../models/rolesResponsibilities");
const assigntaskMasters = require("../models/AssignTaskMaster");
const taskTemplate = require("../models/TaskTemplate")
const employeename = require("../models/EmployeeName");
const router = express.Router();
const admin = require('../controllers/adminController');
const { default: mongoose } = require("mongoose");
const { findOne } = require("../models/adminschema");
// const upload = require("../middlewares/multerMiddleware");
// const departmentgroup=require("../models/DepartmentGroupMaster")
// const departmentType=require("../models/DepartmentType")
// const employeename=require("../models/EmployeeName")
// const employeerole=require("../models/EmployeesRole");



// departmentType.aggregate([
//   {
//     $lookup:{
//       from:"departmentgroup",
//       localField:"departmentGroup",
//       foreignField:"_id",
//       as:"matchedFields"
//     }
//   },
//   {
//     $addfields:{
//       matchedIds:{
//         $map:{
//           input:"$matchedDocs",
//           as:"matchedField",
//           in:"$$matchedField.commonId"
//         }
//       }
//     }
//   },
//   {
//     $addfields:{
//       commonIdsInBothCollections:{
//         $filter:{
//           input:"$_id",
//           as:"_id",
//           cond:{$in:["$$_id","$matchedIds"]}
//           console.log(matchedIds);
//         }
//       }
//     }
//   }
// ]);


// const getdepartmenttypecommonwithdeptgrp=async()=>{
//   try{
// const departmenttype=await departmentType.find({departmentgroup.map:req.body.departmentGroup})
// res.status(200).send({success:true,msg:'Department Type Data',data:departmenttype})
//   }
//   catch(error){
//     res.status(400).send({success:false,msg:error.message})
//   }
// }


// Add Community 

const addRolesResponsibility = async (req, res) => {
  try {
    const { employeeName, email, password, isActive, tasktemplate } = req.body;
    console.log("task", req.params);

    // Check if employeeName is unique
    const existingEmployee = await RolesResponsibilities.findOne({ employeeName: employeeName });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee Role already exists." });
    }

    let query = [
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      { $unwind: { path: "$tasks" } },
      {
        $lookup: {
          from: "assigntaskmasters",
          localField: "tasks.id",
          foreignField: "tasktypes",
          as: "assigntaskmaster"
        }
      },
      { $unwind: { path: "$assigntaskmaster" } },
      {
        $set: {
          len: { $size: "$assigntaskmaster.employeeName" }
        }
      },
      { $match: { len: 0 } },
      {
        $project: {
          documentname: "$assigntaskmaster.documentname",
          documentdepartmenttype: "$assigntaskmaster.documentdepartmenttype",
          tasktypes: "$assigntaskmaster.tasktypes",
          formlink: "$assigntaskmaster.formlink",
          documenttype: "$assigntaskmaster.documenttype",
          uploaddocument: "$assigntaskmaster.uploaddocument",
          documentlink: "$assigntaskmaster.documentlink",
          documentdescription: "$assigntaskmaster.documentdescription",
          assignedby: "$assigntaskmaster.assignedby",
        }
      }
    ];
    const taskTemplates = await taskTemplate.aggregate(query);
    console.log("taskTemplates", taskTemplates);

    const employee = await employeename.findOne({ _id: employeeName });
    const user = await RolesResponsibilities.create({
      locationSchema: employee.location,
      departmentGroup: employee.departmentGroup,
      departmentType: employee.departmentType,
      employeeRole: employee.employeeRole,
      employeeName: employeeName,
      email: email,
      password: password,
      isActive: isActive,
      tasktemplate: tasktemplate,
    });
    console.log("tasktemplatelength", taskTemplates.length);

    for (let i = 0; i < taskTemplates.length; i++) {
      const task = await assigntaskMasters.create({
        locationSchema: [employee.location],
        departmentGroup: [employee.departmentGroup],
        departmentType: [employee.departmentType],
        employeeRole: [employee.employeeRole],
        employeeName: [employeeName],
        email: email,
        password: password,
        isActive: isActive,
        isTemplate: true,
        documentname: taskTemplates[i].documentname,
        documentdepartmenttype: taskTemplates[i].documentdepartmenttype,
        tasktypes: taskTemplates[i].tasktypes,
        formlink: taskTemplates[i].formlink,
        documenttype: taskTemplates[i].documenttype,
        uploaddocument: taskTemplates[i].uploaddocument,
        documentlink: taskTemplates[i].documentlink,
        documentdescription: taskTemplates[i].documentdescription,
      });
      console.log("Taskkkkk", task);
    }

    res.json({ success: true, data: taskTemplates });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};


const getRolesResponsibilities = async (req, res) => {
  try {
    const rolesresponsibilities = await RolesResponsibilities.find()
      .populate([
        { path: 'employeeRole', select: 'EmployeeRole' },
        { path: 'employeeName', select: 'name' },
        { path: 'locationSchema', select: 'name' },

      ]).exec()

    const rolesResponsibilitiesCount = await RolesResponsibilities.countDocuments();
    res.json({ success: true, rolesresponsibilities, rolesResponsibilitiesCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // console.log(error);
  }
};


const getRolesResponsibilityById = async (req, res) => {
  try {
    const roleId = req.params.id;

    const rolesResponsibility = await RolesResponsibilities.findById(roleId);

    if (!rolesResponsibility) {
      return res.status(404).json({ success: false, message: 'Roles and responsibilities not found' });
    }

    res.json({ success: true, rolesResponsibility });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // console.log(error);
  }
};
const getSpecificRolesResponsibility = async (req, res) => {
  try {
    const id = req.params.id;
    const rolesResponsibility = await RolesResponsibilities.findById(id).populate([
      { path: 'locationSchema', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },
      { path: 'employeeRole', select: 'EmployeeRole' },
      { path: 'employeeName', select: 'name' },
      { path: 'tasktemplate', select: 'templateName' },
    ]);

    if (!rolesResponsibility) {
      return res.status(404).json({ error: 'Roles and responsibilities not found' });
    }

    return res.json({ success: true, data: rolesResponsibility });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editRolesResponsibility = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,


      email,
      password,
      isActive,
    } = req.body;

    const updatedRolesResponsibility = await RolesResponsibilities.findByIdAndUpdate(
      id,
      {
        locationSchema,
        departmentGroup,
        departmentType,
        employeeRole,


        employeeName,


        email,
        password,
        isActive,
      },
      { new: true }
    );

    if (!updatedRolesResponsibility) {
      return res.status(404).json({ error: 'Roles and responsibilities not found' });
    }

    return res.json({ success: true, data: updatedRolesResponsibility });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const listRolesResponsibilities = async (req, res) => {
  try {
    const { page, skip, per_page, sorton, sortdir, match } = req.body;

    let query = [];
    query.push({
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
          from: "employeenames",
          localField: "employeeName",
          foreignField: "_id",
          as: "employeeName"
        }
      },
      { $unwind: { path: "$employeeName", preserveNullAndEmptyArrays: true } },)

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            // Add more fields for search as needed
            { email: { $regex: match, $options: 'i' } },
            { password: { $regex: match, $options: 'i' } },
            { isActive: { $regex: match, $options: 'i' } },
            { "employeeRole.EmployeeRole": { $regex: match, $options: 'i' } },
            { "employeeName.name": { $regex: match, $options: 'i' } },
          ],
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { createdAt: -1 }; // Sort by creation date by default, adjust based on your needs
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
    const populatedList = await RolesResponsibilities.aggregate(query).exec(); // Add .exec() to execute the aggregation
    // const populatedList = await RolesResponsibilities.populate(list, [
    //   { path: 'location', select: 'name' },
    //   { path: 'departmentGroup', select: 'name' },
    //   { path: 'departmentType', select: 'name' },
    //   { path: 'employeeRole', select: 'EmployeeRole' },
    //   { path: 'employeeName', select: 'name' },
    // ]);
    // console.log('Query result:', rolesResponsibilitiesList);
    res.json(populatedList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
const deleterolesresponsibility = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedLocation = await RolesResponsibilities.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    //await DepartmentType.deleteMany({ departmentGroup: id });
    res.json({ success: true, msg: "Location Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTemplateTask = async (req, res) => {
  try {
    const employeeName = req.params.employeeName;

    // Ensure the employeeName is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employeeName)) {
      return res.status(400).json({ error: 'Invalid employee name ID' });
    }

    const result = await assigntaskMasters.deleteMany({
      isTemplate: true,
      employeeName: new mongoose.Types.ObjectId(employeeName)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No matching tasks found' });
    }
    const result2 = await RolesResponsibilities.updateOne(
      { employeeName: new mongoose.Types.ObjectId(employeeName) },
      { tasktemplate: new mongoose.Types.ObjectId("6654270d3110d1063bc75c30") }
    );
    if (result2.UpdateCount === 0) {
      return res.status(404).json({ error: 'No matching Template found' });
    }
    res.json({ success: true, msg: `${result.deletedCount} task(s) deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addRolesResponsibility,
  getRolesResponsibilities,
  getRolesResponsibilityById,
  editRolesResponsibility,
  getSpecificRolesResponsibility,
  listRolesResponsibilities,
  deleterolesresponsibility,
  deleteTemplateTask,
  // getdepartmenttypecommonwithdeptgrp
};