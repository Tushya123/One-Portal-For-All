// const upload=require("../middlewares/multerMiddleware");
// const express = require("express");
// const AssignTask=require('../models/AssignTaskMaster');
// const router = express.Router();

// const addassigntask = async (req, res) => {
//     try {
//       const { documentname ,documentdepartmenttype,tasktypes,formlink,documenttype,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = req.body;
//       const uploaddocument=req.file.path;
//       console.log("file path from frontend is",uploaddocument);
//       const newAssignTask = new AssignTask({documentname ,documentdepartmenttype,tasktypes,formlink,documenttype,uploaddocument,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive});
//       const savedAssignTask = await newAssignTask.save();
//       return res.json({success : true , data : savedAssignTask});
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
//   const getAllAssignTask = async (req, res) => {
//     try {
//       const assigntask = await AssignTask.find()
//       .populate([

//         {path:'locationSchema',select:'name'},
//         {path:'documentdepartmenttype',select:'name'},
//         {path:'tasktypes',select:'taskName'},
//         { path: 'departmentGroup', select: 'name' },
//         { path: 'departmentType', select: 'name' },
//         {path:'employeeRole',select:'EmployeeRole'},
//         {path:'employeeName',select:'name'},
//       ])
//       .exec();
//        return res.json({data:assigntask});
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
//   const getAssignTaskById = async (req, res) => {
//     try {
//       const id = req.params.id;

//       // Use findById to retrieve the specific document
//       const addtask = await AssignTask.findById(id)
//           .populate('documentdepartmenttype', 'name')
//           .populate('tasktypes', 'taskName')
//           .populate('locationSchema', 'name')
//           .populate('departmentGroup', 'name')
//           .populate('departmentType', 'name')
//           .populate('employeeRole', 'EmployeeRole')
//           .populate('employeeName', 'name')
//           .exec();

//       if (!addtask) {
//           return res.status(404).json({ error: 'Task not found' });
//       }

//       // Use countDocuments to get the count of documents
//       const count = await AssignTask.countDocuments({ _id: id });

//       return res.json({ success: true, data: addtask, count: count });
//   } catch (error) {
//     console.log(error)
//       res.status(500).json({ error: error.message });
//   }
// };
// const getAssignTaskByDeptId = async (req, res) => {
//   try {
//     const id = req.params.id;

//     // Use findById to retrieve the specific document
//     const addtask = await AssignTask.find({documentdepartmenttype:id})
//         .populate('documentdepartmenttype', 'name')
//         .populate('tasktypes', 'taskName')
//         .populate('locationSchema', 'name')
//         .populate('departmentGroup', 'name')
//         .populate('departmentType', 'name')
//         .populate('employeeRole', 'EmployeeRole')
//         .populate('employeeName', 'name')
//         .exec();

//     if (!addtask) {
//         return res.status(404).json({ error: 'Task not found' });
//     }

//     // Use countDocuments to get the count of documents
//     const count = await AssignTask.countDocuments({ _id: id });

//     return res.json({ success: true, data: addtask, count: count });
// } catch (error) {
//   console.log(error)
//     res.status(500).json({ error: error.message });
// }
// };

//   const getAllAssignTaskByEmployeeId = async (req, res) => {
//     try {
//       const employeeId = req.params.id;
//       console.log("jefjefj", employeeId);

//       // Find all assign tasks where the employeeName matches the provided employeeId
//       const assignTasks = await AssignTask.find({ employeeName: employeeId })
//         .populate([
//           { path: 'documentdepartmenttype', select: 'name' },
//           { path: 'tasktypes', select: 'taskName' },
//           { path: 'locationSchema', select: 'name' },
//           { path: 'departmentGroup', select: 'name' },
//           { path: 'departmentType', select: 'name' },
//           { path: 'employeeRole', select: 'EmployeeRole' },
//           { path: 'employeeName', select: 'name' }
//         ])
//         .exec();

//       // Count the number of assign tasks
//       const assignTasksCount = await AssignTask.countDocuments({ employeeName: employeeId });

//       // Send the retrieved data and count as a response
//       return res.json({ data: assignTasks, count: assignTasksCount });
//     } catch (error) {
//       // Handle any errors and send an error response
//       res.status(500).json({ error: error.message });
//     }
//   };

//   const getspecificassigntask = async (req, res) => {
//     try {
//       const  id  = req.params.id;
//       const addtask = await AssignTask.findById(id).populate('departmentType','name');

//       if (!addtask) {
//         return res.status(404).json({ error: 'group not found' });
//       }

//      return res.json({success : true , data:addtask});
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

// //   const editAssignTask = async (req, res) => {
// //     try {
// //         const { id } = req.params.id;
// //         const {
// //             documentname,
// //             documentdepartmenttype,
// //             tasktypes,
// //             formlink,
// //             documenttype,
// //             uploaddocument,
// //             documentlink,
// //             documentdescription,
// //             locationSchema,
// //             departmentGroup,
// //             departmentType,
// //             employeeRole,
// //             employeeName,
// //             isActive,
// //         } = req.body;

// //         const updatedAssignTask = await AssignTask.findByIdAndUpdate(
// //             id,
// //             {
// //                 documentname,
// //                 documentdepartmenttype,
// //                 tasktypes,
// //                 formlink,
// //                 documenttype,
// //                 uploaddocument,
// //                 documentlink,
// //                 documentdescription,
// //                 locationSchema,
// //                 departmentGroup,
// //                 departmentType,
// //                 employeeRole,
// //                 employeeName,
// //                 isActive,
// //             },
// //             { new: true }
// //         );

// //         if (!updatedAssignTask) {
// //             return res.status(404).json({ error: 'AssignTask111 not found' });
// //         }

// //         return res.json({ success: true, data: updatedAssignTask });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // // };
// const editAssignTask = async (req, res) => {
//   try {
//       const id = req.params.id; // Assuming you have an identifier for the task to be assigned
//       const { documentname, documentdepartmenttype, tasktypes, formlink, documenttype, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive } = req.body;
//       let uploaddocument;
//       if (req.file) {
//         // If a file is uploaded, store its path or any other relevant information
//         console.log(req.file);
//         uploaddocument = req.file.path;
//       } else {
//         // If no file is uploaded, retain the existing value (if any)
//         uploaddocument = req.body.uploaddocument;
//     }

//       const updatedTask = await AssignTask.findByIdAndUpdate(
//           id,
//           {
//               documentname,
//               documentdepartmenttype,
//               tasktypes,
//               formlink,
//               documenttype,
//               uploaddocument,
//               documentlink,
//               documentdescription,
//               locationSchema,
//               departmentGroup,
//               departmentType,
//               employeeRole,
//               employeeName,
//               isActive
//           },
//           { new: true },
//       );

//       if (!updatedTask) {
//           return res.status(404).json({ error: 'Task not found' });
//       }

//       return res.json({ success: true, data: updatedTask });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };

// const DeleteAssignTask = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedAssignTask = await AssignTask.findByIdAndDelete(id);

//         if (!deletedAssignTask) {
//             return res.status(404).json({ error: 'AssignTask not found' });
//         }

//         return res.json({ success: true, msg: "AssignTask Deleted Successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// module.exports = {
//     addassigntask,
//     getAllAssignTask,
//     getAssignTaskById,
//     getAssignTaskByDeptId,
//     getAllAssignTaskByEmployeeId,
//     DeleteAssignTask,
//     editAssignTask,
//     // EditassignTask,
// }
const upload = require("../middlewares/multerMiddleware");
const express = require("express");
const AssignTask = require("../models/AssignTaskMaster");
const TaskTemplate = require("../models/TaskTemplate")
const router = express.Router();
const employeename = require("../models/EmployeeName");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const addassigntask = async (req, res) => {
  try {
    const {
      documentname,
      documentdepartmenttype,
      tasktypes,
      formlink,
      documenttype,
      documentlink,
      documentdescription,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive,
      assignedby,
    } = req.body;

    console.log("Assigned By:", assignedby); // Check the value of assignedby

    const uploaddocument = req.file.path;

    // Convert assignedby to a mongoose ObjectId
    const assignedById = mongoose.Types.ObjectId(assignedby);

    console.log("Assigned By ID:", assignedById); // Check the converted ObjectId

    const employees = await employeename.find({ _id: { $in: employeeName } });

    console.log("Employees:", employees); // Check the fetched employees

    for (let i = 0; i < employees.length; i++) {
      const task = await AssignTask.create({
        locationSchema: [employees[i].location],
        departmentGroup: [employees[i].departmentGroup],
        departmentType: [employees[i].departmentType],
        employeeRole: [employees[i].employeeRole],
        employeeName: [employees[i]._id],
        isActive: isActive,
        isTemplate: false,
        documentname,
        documentdepartmenttype,
        tasktypes,
        formlink,
        documenttype,
        documentlink,
        documentdescription,
        uploaddocument,
        assignedby: assignedById, // Assign the converted assignedby
      });
      res.json({ success: true, data: task });
      console.log("Taskkkkk", task);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllAssignTask = async (req, res) => {
  try {
    const assigntask = await AssignTask.find()
      .populate([
        { path: "locationSchema", select: "name" },
        { path: "documentdepartmenttype", select: "name" },
        { path: "tasktypes", select: "taskName" },
        { path: "departmentGroup", select: "name" },
        { path: "departmentType", select: "name" },
        { path: "employeeRole", select: "EmployeeRole" },
        { path: "employeeName", select: "name" },
        { path: "assignedby", select: "name" },
      ])
      .exec();
    const assigncount = await AssignTask.countDocuments({
      uploaddocument: { $ne: "" },
    });
    return res.json({ data: assigntask, assigncount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAssignTaskById = async (req, res) => {
  try {
    const id = req.params.id;

    // Use findById to retrieve the specific document
    const addtask = await AssignTask.findById(id)
      .populate([
        { path: "locationSchema", select: "name" },
        { path: "documentdepartmenttype", select: "name" },
        { path: "tasktypes", select: "taskName" },
        { path: "departmentGroup", select: "name" },
        { path: "departmentType", select: "name" },
        { path: "employeeRole", select: "EmployeeRole" },
        { path: "employeeName", select: "name" },
        { path: "assignedby", select: "name" },
      ])
      .exec();
    if (!addtask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Use countDocuments to get the count of documents
    const count = await AssignTask.countDocuments({ _id: id });

    return res.json({ success: true, data: addtask, count: count });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: error.message });
  }
};
const getAssignTaskByDeptId = async (req, res) => {
  try {
    const id = req.params.id;

    // Use findById to retrieve the specific document
    const addtask = await AssignTask.find({ documentdepartmenttype: id })
      .populate("documentdepartmenttype", "name")
      .populate("tasktypes", "taskName")
      .populate("locationSchema", "id name")
      .populate("departmentGroup", "id name")
      .populate("departmentType", "id name")
      .populate("employeeRole", "id EmployeeRole")
      .populate("employeeName", "id name")
      .populate("assignedby", "name")

      .exec();

    if (!addtask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Use countDocuments to get the count of documents
    const count = await AssignTask.countDocuments({ _id: id });

    return res.json({ success: true, data: addtask, count: count });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getAllAssignTaskByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.id;
    // console.log("jefjefj", employeeId);

    // Find all assign tasks where the employeeName matches the provided employeeId
    const assignTasks = await AssignTask.find({ employeeName: employeeId })
      .populate([
        { path: "documentdepartmenttype", select: "name" },
        { path: "tasktypes", select: "taskName" },
        { path: "locationSchema", select: "name" },
        { path: "departmentGroup", select: "name" },
        { path: "departmentType", select: "name" },
        { path: "employeeRole", select: "EmployeeRole" },
        { path: "employeeName", select: "name" },
        { path: "assignedby", select: "name" },
      ])
      .exec();

    // Count the number of assign tasks
    const assignTasksCount = await AssignTask.countDocuments({
      employeeName: employeeId,
    });

    // Send the retrieved data and count as a response
    return res.json({ data: assignTasks, count: assignTasksCount });
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: error.message });
  }
};

const getspecificassigntask = async (req, res) => {
  try {
    const id = req.params.id;
    const addtask = await AssignTask.findById(id).populate(
      "departmentType",
      "name"
    );

    if (!addtask) {
      return res.status(404).json({ error: "group not found" });
    }

    return res.json({ success: true, data: addtask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   const editAssignTask = async (req, res) => {
//     try {
//         const { id } = req.params.id;
//         const {
//             documentname,
//             documentdepartmenttype,
//             tasktypes,
//             formlink,
//             documenttype,
//             uploaddocument,
//             documentlink,
//             documentdescription,
//             locationSchema,
//             departmentGroup,
//             departmentType,
//             employeeRole,
//             employeeName,
//             isActive,
//         } = req.body;

//         const updatedAssignTask = await AssignTask.findByIdAndUpdate(
//             id,
//             {
//                 documentname,
//                 documentdepartmenttype,
//                 tasktypes,
//                 formlink,
//                 documenttype,
//                 uploaddocument,
//                 documentlink,
//                 documentdescription,
//                 locationSchema,
//                 departmentGroup,
//                 departmentType,
//                 employeeRole,
//                 employeeName,
//                 isActive,
//             },
//             { new: true }
//         );

//         if (!updatedAssignTask) {
//             return res.status(404).json({ error: 'AssignTask111 not found' });
//         }

//         return res.json({ success: true, data: updatedAssignTask });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// // };
const editAssignTask = async (req, res) => {
  try {
    const id = req.params.id; // Assuming you have an identifier for the task to be assigned
    const {
      documentname,
      documentdepartmenttype,
      tasktypes,
      formlink,
      documenttype,
      uploaddocument,
      documentlink,
      documentdescription,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive,
    } = req.body;
    let doc;
    if (req.file) {
      // If a file is uploaded, store its path or any other relevant information
      // console.log(req.file);
      doc = req.file.path;
    } else {
      // If no file is uploaded, retain the existing value (if any)
      doc = req.body.uploaddocument;
    }

    const updatedTask = await AssignTask.findByIdAndUpdate(
      id,
      {
        documentname,
        documentdepartmenttype,
        tasktypes,
        formlink,
        documenttype,
        uploaddocument: doc,
        documentlink,
        documentdescription,
        locationSchema: locationSchema.length ? locationSchema.split(",") : [],
        departmentGroup: departmentGroup.length
          ? departmentGroup.split(",")
          : [],
        departmentType: departmentType ? departmentType.split(",") : [],
        employeeRole: employeeRole ? employeeRole.split(",") : [],
        employeeName: employeeName ? employeeName.split(",") : [],
        isActive,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ success: true, data: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const DeleteAssignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the assigned task to get the tasktypes ID
    const assignTask = await AssignTask.findById(objectId);

    if (!assignTask) {
      return res.status(404).json({ error: "AssignTask not found" });
    }

    const tasktypesId = assignTask.tasktypes;
    console.log('Tasktypes ID to delete:', tasktypesId);

    // Delete the assigned task
    const deletedAssignTask = await AssignTask.findByIdAndDelete(objectId);

    if (!deletedAssignTask) {
      return res.status(404).json({ error: "AssignTask not found" });
    }

    // Find templates containing the tasktypes ID
    const templatesContainingTask = await TaskTemplate.find({ 'tasks.id': tasktypesId });

    // Log the templates found
    console.log('Templates containing task:', JSON.stringify(templatesContainingTask, null, 2));

    // If no templates are found, log the message
    if (templatesContainingTask.length === 0) {
      console.log('No templates found containing the tasktypes ID.');
    }

    // Remove the task from all templates
    const result = await TaskTemplate.updateMany(
      { 'tasks.id': tasktypesId },
      { $pull: { tasks: { id: tasktypesId } } }
    );

    console.log('Update Result:', result); // Log the result of the update operation

    return res.json({ success: true, msg: "AssignTask Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const GetAssignTaskByEmployeeId = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await AssignTask.find({
      $or: [{ employeeName: id }],
    }).populate([
      { path: "documentdepartmenttype", select: "name" },
      { path: "tasktypes", select: "taskName" },
      { path: "assignedby", select: "name" },
    ]);
    return res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAssignTaskByDepartmentandTaskName = async (req, res) => {
  try {
    const { id1, id2 } = req.params; // Extracting two parameters from req.params
    const tasks = await AssignTask.find({
      $and: [
        { documentdepartmenttype: id1 }, // Check if documentdepartmenttype matches id1
        { tasktypes: id2 } // Check if employeeName matches id2
      ]
    }).populate([
      { path: "documentdepartmenttype", select: "name" },
      { path: "tasktypes", select: "taskName" },
      { path: "assignedby", select: "name" },
      { path: "employeeName", select: "name" },
    ]);
    return res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const GetAssignTaskByDepartmentTypeandEmployeeName = async (req, res) => {
  try {
    const { id1, id2 } = req.params; // Extracting two parameters from req.params
    const tasks = await AssignTask.find({
      $and: [
        { documentdepartmenttype: id1 },
        { employeeName: id2 }
        // Check if documentdepartmenttype matches id1
        // Check if employeeName matches id2
      ]
    }).populate([
      { path: "documentdepartmenttype", select: "name" },
      { path: "tasktypes", select: "taskName" },
      { path: "assignedby", select: "name" },
    ]);
    return res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listAssignedTasks = async (req, res) => {
  try {
    const { page, per_page, skip, sorton, sortdir, match } = req.body;

    let query = [
      { $unwind: { path: "$departmentType", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$employeeName", preserveNullAndEmptyArrays: true } },
    ];



    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { documentname: 1 }; // Adjust based on your field names
    }
    query.push({ $sort: sort });

    // Lookups for related data
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
          from: "addtasks",
          localField: "tasktypes",
          foreignField: "_id",
          as: "tasktype"
        }
      },
      { $unwind: { path: "$tasktype", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "adminnames",
          localField: "assignedby",
          foreignField: "_id",
          as: "assignedby"
        }
      },
      { $unwind: { path: "$assignedby", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "employeenames",
          localField: "employeeName",
          foreignField: "_id",
          as: "employeeName"
        }
      },
      {
        $unwind: { path: "$employeeName", preserveNullAndEmptyArrays: true }
      }
    );
    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { documentname: { $regex: match, $options: 'i' } },
            { documentdescription: { $regex: match, $options: 'i' } },
            { "employeeName.name": { $regex: match, $options: 'i' } },
            { "documentdepartmenttype.name": { $regex: match, $options: 'i' } },
            { "tasktype.taskName": { $regex: match, $options: 'i' } },
            { "assignedby.name": { $regex: match, $options: 'i' } },
            // Add more fields for search as needed
          ],
        },
      });
    }
    // Pagination
    if (page !== undefined && per_page !== undefined) {
      const skip = (page - 1) * per_page;
      query.push({ $skip: skip }, { $limit: per_page });
    }

    // Facet to get count and paginated data
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

    const populatedAssignedTasksList = await AssignTask.aggregate(query).exec();

    console.log('Query result:', populatedAssignedTasksList);
    res.json(populatedAssignedTasksList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// const listAssignedTasksspec = async (req, res) => {
//   try {
//     const { page, per_page, sorton, sortdir, match } = req.body;
//     const { departmentType } = req.params;

//     let query = [];

//     // Handle match parameter
//     if (match) {
//       query.push({
//         $match: {
//           $or: [
//             { documentname: { $regex: match, $options: 'i' } },
//             { documentdescription: { $regex: match, $options: 'i' } },
//             // Add more fields for search as needed
//           ],
//         },
//       });
//     }

//     // Optionally sort documents
//     let sort = {};
//     if (sorton && sortdir) {
//       sort[sorton] = sortdir === 'desc' ? -1 : 1;
//     } else {
//       sort = { documentname: 1 }; // Adjust based on your field names
//     }
//     query.push({ $sort: sort });

//     // Optionally skip and limit documents for pagination
//     let skip = 0;
//     if (page !== undefined && per_page !== undefined) {
//       skip = (page - 1) * per_page;
//       query.push({ $skip: skip });
//       query.push({ $limit: per_page });
//     }

//     const assignedTasksList = await AssignTask.aggregate(query).exec(); // Add .exec() to execute the aggregation

//     // Populate departmentType and tasktypes fields with their names
//     const populatedAssignedTasksList = await AssignTask.populate(assignedTasksList, [
//       { path: 'documentdepartmenttype',  select: 'name' },
//       { path: 'tasktypes',  select: 'taskName' },
//     ]);

//     console.log('Query result:', populatedAssignedTasksList);
//     res.json(populatedAssignedTasksList);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error', message: error.message });
//   }
// };
const listAssignedTasksspec = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;
    const { departmentType } = req.params; // Extract departmentType from req.params

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { documentname: { $regex: match, $options: 'i' } },
            { documentdescription: { $regex: match, $options: 'i' } },
            // Add more fields for search as needed
          ],
        },
      });
    }

    // Optionally filter by departmentType
    if (departmentType) {
      query.push({
        $match: {
          departmentType: new mongoose.Types.ObjectId(departmentType), // Assuming documentdepartmenttype is the field name
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { documentname: 1 }; // Adjust based on your field names
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }

    // Execute the aggregation query
    const assignedTasksList = await AssignTask.aggregate(query).exec();

    // Format the response data to match the provided array format
    // const formattedAssignedTasksList = assignedTasksList.map(task => ({
    //   _id: task._id,
    //   documentname: task.documentname,
    //   documentdepartmenttype: task.documentdepartmenttype,
    //   tasktypes: task.tasktypes,
    //   formlink: task.formlink,
    //   documenttype: task.documenttype,
    //   uploaddocument: task.uploaddocument,
    //   documentlink: task.documentlink,
    //   documentdescription: task.documentdescription,
    //   locationSchema: task.locationSchema,
    //   departmentGroup: task.departmentGroup,
    //   departmentType: task.departmentType,
    //   employeeRole: task.employeeRole,
    //   employeeName: task.employeeName,
    //   isActive: task.isActive,
    //   assignedby: task.assignedby,
    //   createdAt: task.createdAt,
    //   updatedAt: task.updatedAt,
    //   __v: task.__v,
    // }));
    const populatedAssignedTasksList = await AssignTask.populate(assignedTasksList, [
      { path: 'departmentType', select: 'name' },
      { path: 'tasktypes', select: 'taskName' },
      { path: "assignedby", select: "name" },
    ]);

    // Send the response
    res.json(populatedAssignedTasksList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
const getAllAssignTaskForTemplate = async (req, res) => {
  try {
    const assigntask = await AssignTask.aggregate([
      {
        $set: {
          len: { $size: "$employeeName" }
        }
      },
      { $match: { len: 0 } },
      {
        $lookup: {
          from: "addtasks",
          localField: "tasktypes",
          foreignField: "_id",
          as: "taskDetails",
        },
      },
      {
        $match: {
          "taskDetails.accessLocation": "No",
        },
      },
      {
        $lookup: {
          from: "departmenttypes",
          localField: "documentdepartmenttype",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $unwind: {
          path: "$departmentDetails"
        }
      },
      {
        $project: {
          documentname: 1,
          documentdepartmenttype: 1,
          tasktypes: 1,
          formlink: 1,
          documenttype: 1,
          uploaddocument: 1,
          documentlink: 1,
          documentdescription: 1,
          locationSchema: 1,
          departmentGroup: 1,
          departmentType: "$departmentDetails.name",
          employeeRole: 1,
          employeeName: 1,
          isActive: 1,
          assignedby: 1,
          taskDetails: 1,
          // departmentDetails: 1,
        },
      },
    ]);

    return res.json({ data: assigntask, assigncount: assigntask.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addassigntask,
  getAllAssignTask,
  getAssignTaskById,
  getAssignTaskByDeptId,
  getAllAssignTaskByEmployeeId,
  DeleteAssignTask,
  editAssignTask,
  GetAssignTaskByEmployeeId,
  listAssignedTasks,
  listAssignedTasksspec,
  GetAssignTaskByDepartmentandTaskName,
  getAllAssignTaskForTemplate,
  GetAssignTaskByDepartmentTypeandEmployeeName
  // EditassignTask,
};
