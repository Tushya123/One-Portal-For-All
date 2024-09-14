// // const express = require("express");
// // const router = express.Router();
// // const assigntaskmaster1=require("../models/AssignTaskMaster");
// // const {addassigntask,getAllAssignTask}=require('../controllers/AssignTask');
// // const DepartmentGroup = require("../models/DepartmentGroupMaster");
// // upload=require("../middlewares/multerMiddleware");
// // const AssignTask=require('../models/AssignTaskMaster');
// // router.post("/addassigntask", upload.single('uploaddocument'), async(req, res) => {
// //     try{
// //     console.log("image path is", req.file.path);
// //     // Handle the file path as needed
// //     const id=req.params.id;
// //     res.send('File uploaded successfully');
// //     const {documentname,documentdepartmenttype,tasktypes,documenttype,formlink,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = req.body;
// //         console.log("data received",req.body);
// //         const uploadImagePath = req.file.path;
// //         console.log("image file path",uploadImagePath);
// //     //     const newAssignTask = new AssignTask({documentname ,documentdepartmenttype,tasktypes,formlink,documenttype,uploadImagePath,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive});
// //     //   const savedAssignTask = await newAssignTask.save();
// //     //   return res.json({success : true , data : savedAssignTask});
// //         //console.log(uploadimage);
// //          await assigntaskmaster1.create({
// //              documentname:documentname,
// //              documentdepartmenttype:documentdepartmenttype,
// //              tasktypes:tasktypes,
// //              formlink:formlink,
// //              documenttype:documenttype,
// //              uploaddocument:uploadImagePath,
// //              documentlink:documentlink,
// //              documentdescription:documentdescription,
// //              locationSchema:locationSchema.split(","),
// //              departmentGroup:departmentGroup.split(","),
// //              departmentType:departmentType.split(","),
// //              employeeRole:employeeRole.split(","),
// //              employeeName:employeeName.split(",") ,
// //              isActive:isActive,

// //          })

// //   }
// //   catch(error){
// //     console.log("error saving to databse",error);
// //   }});
// // router.post('/addassigntask',addassigntask);
// // router.get('/getassigntask',getAllAssignTask);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const assigntaskmaster1=require("../models/AssignTaskMaster");
// const {addassigntask,getAllAssignTask,getAssignTaskById,editAssignTask,getAssignTaskByDeptId,DeleteAssignTask,getAllAssignTaskByEmployeeId}=require('../controllers/AssignTask');
// const DepartmentGroup = require("../models/DepartmentGroupMaster");

// // const AssignTask=require('../models/AssignTaskMaster');
// const upload = require("../middlewares/multerMiddleware");
// router.post("/addassigntask", upload.single('uploaddocument'), async (req, res) => {
//   try {
//       let uploadImagePath = '';
//       if (req.file) {
//           uploadImagePath = req.file.path;
//       }

//       const { documentname, documentdepartmenttype, tasktypes, documenttype, formlink, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive } = req.body;
//       console.log("data received", req.body);

//       await assigntaskmaster1.create({
//           documentname: documentname,
//           documentdepartmenttype: documentdepartmenttype,
//           tasktypes: tasktypes,
//           formlink: formlink,
//           documenttype: documenttype,
//           uploaddocument: uploadImagePath, // Conditionally include uploadImagePath
//           documentlink: documentlink,
//           documentdescription: documentdescription,
//           locationSchema: locationSchema ? locationSchema.split(",") : [], // Handle potential undefined values
//           departmentGroup: departmentGroup ? departmentGroup.split(",") : [],
//           departmentType: departmentType ? departmentType.split(",") : [],
//           employeeRole: employeeRole ? employeeRole.split(",") : [],
//           employeeName: employeeName ? employeeName.split(",") : [],
//           isActive: isActive,
//       });

//       res.send('File uploaded successfully');
//   } catch (error) {
//       console.log("error saving to database", error);
//       res.status(500).send('Error saving to database');
//   }
// });


//   // router.put("/editassigntask/:id",upload.single('uploaddocument'), async(req, res) => {
//   //   // console.log("image path is", req.file.path);
//   //   // Handle the file path as needed
//   //   try{
//   //     console.log("image path is", req.file.path);
//   //     // Handle the file path as needed
//   //     const id=req.params.id;
//   //     res.send('File uploaded successfully');
//   //     let {documentname,documentdepartmenttype,tasktypes,documenttype,formlink,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = await req.body;
//   //         console.log("data received",req.body);
//   //         const uploadImagePath = req.file.path;
//   //         console.log("image file path",uploadImagePath);
//   //         imagep=req.file.path;
//   //     const uploadimage=imagep;
//   //     console.log("image file path",uploadimage);
//   //          await assigntaskmaster1.create({
//   //              documentname:documentname,
//   //              documentdepartmenttype:documentdepartmenttype,
//   //              tasktypes:tasktypes,
//   //              formlink:formlink,
//   //              documenttype:documenttype,
//   //              uploaddocument:uploadimage,
//   //              documentlink:documentlink,
//   //              documentdescription:documentdescription,
//   //              locationSchema:locationSchema.split(","),
//   //              departmentGroup:departmentGroup.split(","),
//   //              departmentType:departmentType.split(","),
//   //              employeeRole:employeeRole.split(","),
//   //              employeeName:employeeName.split(",") ,
//   //              isActive:isActive,

//   //          })
//   //         }
//   //         catch(error){
//   //           console.log("error saving to database",error);
//   //         }});
//   router.put("/editassigntask/:id",upload.single('uploaddocument'), async(req, res) => {
//     console.log("image path is", req.file.path);
//     // Handle the file path as needed
//     const id=req.params.id;
//     res.send('File uploaded successfully');  
//     try{
//       let {name,message,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = await req.body;
//       console.log("data received",req.body);
//       // const uploadImagePath = req.file.path;
//       imagep=req.file.path;
//       const uploadimage=imagep;
//       console.log("image file path",uploadimage);
//       // let uploadimage = req.file ? req.file.path : ''; // Check if new image uploaded, else use empty string
//       // if (!uploadimage) {
//       //   // No new image uploaded, fetch the existing image path from the database
//       //   const communityMessage = await assigntaskmaster1.findById(id);
//       //   if (communityMessage) {
//       //     uploadimage = communityMessage.uploadimage; // Use the stored image path
//       //   }
//       // }
//       const updatedcommunitymaster=await assigntaskmaster1.findByIdAndUpdate(id,{
//         name:name,
//         message:message,
//         locationSchema:locationSchema.split(","),
//         departmentGroup:departmentGroup.split(","),
//         departmentType:departmentType.split(","),
//         employeeRole:employeeRole.split(","),
//         employeeName:employeeName.split(","),
//         isActive:isActive,
//        uploadimage:uploadimage,
//       },{ new: true })
//       // res.json({ success: true, data: updatedcommunitymaster });
//     }
//     catch (error) {
//       console.error("Error updating community message:", error);
//       res.status(500).json({ success: false, error: "Internal Server Error" });
//     }

//        // console.log(uploadimage);

//         // return res.json({success:true, data : updatedcommunitymaster});

//   });
//   // router.put("/editassigntask/:id",upload.single('uploaddocument'), async(req, res) => {
//   //   // console.log("image path is", req.file.path);
//   //   // Handle the file path as needed
//   //   const id=req.params.id;
//   //   // res.send('File uploaded successfully');  
//   //   try{
//   //     let {name,message,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = await req.body;
//   //     // console.log("data received",req.body);
//   //     // // const uploadImagePath = req.file.path;
//   //     // imagep=req.file.path;
//   //     // const uploadimage=imagep;
//   //     // console.log("image file path",uploadimage);
//   //     let uploadimage = req.file ? req.file.path : ''; // Check if new image uploaded, else use empty string
//   //     if (!uploadimage) {
//   //       // No new image uploaded, fetch the existing image path from the database
//   //       const communityMessage = await communityMaster.findById(id);
//   //       if (communityMessage) {
//   //         uploadimage = communityMessage.uploadimage; // Use the stored image path
//   //       }
//   //     }
//   //     const updatedcommunitymaster=await communityMaster.findByIdAndUpdate(id,{
//   //       name:name,
//   //       message:message,
//   //       locationSchema:locationSchema.split(","),
//   //       departmentGroup:departmentGroup.split(","),
//   //       departmentType:departmentType.split(","),
//   //       employeeRole:employeeRole.split(","),
//   //       employeeName:employeeName.split(","),
//   //       isActive:isActive,
//   //      uploadimage:uploadimage,
//   //     },{ new: true })
//   //     // res.json({ success: true, data: updatedcommunitymaster });
//   //   }
//   //   catch (error) {
//   //     console.error("Error updating community message:", error);
//   //     res.status(500).json({ success: false, error: "Internal Server Error" });
//   //   }

//   //      // console.log(uploadimage);

//   //       // return res.json({success:true, data : updatedcommunitymaster});

//   // });


// router.post('/addassigntask',addassigntask);
// router.get('/getassigntask',getAllAssignTask);
// router.get('/getassigntaskbyid/:id',getAssignTaskById);
// // router.put('/editassigntask/:id',editAssignTask);
// router.get('/getassigntaskbyDeptid/:id', getAssignTaskByDeptId);
// router.get('/getspecificassigntaskbyemployeenameid/:id',getAllAssignTaskByEmployeeId);
// router.delete('/deleteassigntask/:id', DeleteAssignTask);




// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const assigntaskmaster1=require("../models/AssignTaskMaster");
// const {addassigntask,getAllAssignTask}=require('../controllers/AssignTask');
// const DepartmentGroup = require("../models/DepartmentGroupMaster");
// upload=require("../middlewares/multerMiddleware");
// const AssignTask=require('../models/AssignTaskMaster');
// router.post("/addassigntask", upload.single('uploaddocument'), async(req, res) => {
//     try{
//     console.log("image path is", req.file.path);
//     // Handle the file path as needed
//     const id=req.params.id;
//     res.send('File uploaded successfully');
//     const {documentname,documentdepartmenttype,tasktypes,documenttype,formlink,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = req.body;
//         console.log("data received",req.body);
//         const uploadImagePath = req.file.path;
//         console.log("image file path",uploadImagePath);
//     //     const newAssignTask = new AssignTask({documentname ,documentdepartmenttype,tasktypes,formlink,documenttype,uploadImagePath,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive});
//     //   const savedAssignTask = await newAssignTask.save();
//     //   return res.json({success : true , data : savedAssignTask});
//         //console.log(uploadimage);
//          await assigntaskmaster1.create({
//              documentname:documentname,
//              documentdepartmenttype:documentdepartmenttype,
//              tasktypes:tasktypes,
//              formlink:formlink,
//              documenttype:documenttype,
//              uploaddocument:uploadImagePath,
//              documentlink:documentlink,
//              documentdescription:documentdescription,
//              locationSchema:locationSchema.split(","),
//              departmentGroup:departmentGroup.split(","),
//              departmentType:departmentType.split(","),
//              employeeRole:employeeRole.split(","),
//              employeeName:employeeName.split(",") ,
//              isActive:isActive,

//          })

//   }
//   catch(error){
//     console.log("error saving to databse",error);
//   }});
// router.post('/addassigntask',addassigntask);
// router.get('/getassigntask',getAllAssignTask);

// module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const AdminNames = require("../models/adminschema")
const employeename12 = require("../models/EmployeeName");
const assigntaskmaster1 = require("../models/AssignTaskMaster");
const { addassigntask, getAllAssignTask, getAssignTaskById, editAssignTask, getAssignTaskByDeptId, DeleteAssignTask, getAllAssignTaskByEmployeeId, GetAssignTaskByEmployeeId, listAssignedTasks, listAssignedTasksspec, GetAssignTaskByDepartmentandTaskName, getAllAssignTaskForTemplate, GetAssignTaskByDepartmentTypeandEmployeeName } = require('../controllers/AssignTask');
const DepartmentGroup = require("../models/DepartmentGroupMaster");
const AdminName = require("../controllers/adminController")
const AssignTask = require('../models/AssignTaskMaster');
const upload = require("../middlewares/multerMiddleware");
const { getAllSpecificTaskByDepartmentTypeId } = require("../controllers/AddTaskController");
// router.post("/addassigntask", upload.single('uploaddocument'), async (req, res) => {
//   try {
//       let uploadImagePath = '';
//       if (req.file) {
//           uploadImagePath = req.file.path;
//       }

//       const { documentname, documentdepartmenttype, tasktypes, documenttype, formlink, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive } = req.body;
//       console.log("data received", req.body);
//       console.log(typeof locationSchema);
//       const locationSchemaString = typeof locationSchema === 'object' ? JSON.stringify(locationSchema) : locationSchema;
//        const departmentGroupString = typeof departmentGroup === 'object' ? JSON.stringify(departmentGroup) : departmentGroup;
//     const departmentTypeString= typeof departmentType === 'object' ? JSON.stringify(departmentType) : departmentType;
//     const employeeRoleString = typeof employeeRole === 'object' ? JSON.stringify(employeeRole) : employeeRole;
//     const employeeNameString = typeof employeeName === 'object' ? JSON.stringify(employeeName) : employeeName;

//       console.log("The type is", typeof locationSchemaString);
//       const locationSchemaArray = typeof locationSchema === 'string'? locationSchema.split(",") : [];
//       const departmentGroupArray = typeof departmentGroup === 'string' ? departmentGroup.split(",") : [];
//     const departmentTypeArray = typeof departmentType === 'string' ? departmentType.split(",") : [];
//     const employeeRoleArray = typeof employeeRole === 'string' ? employeeRole.split(",") : [];
//     const employeeNameArray = typeof employeeName === 'string' ? employeeName.split(",") : [];
//       await assigntaskmaster1.create({
//           documentname: documentname,
//           documentdepartmenttype: documentdepartmenttype,
//           tasktypes: tasktypes,
//           formlink: formlink,
//           documenttype: documenttype,
//           uploaddocument: uploadImagePath, // Conditionally include uploadImagePath
//           documentlink: documentlink,
//           documentdescription: documentdescription,
//           locationSchema: locationSchemaArray , // Handle potential undefined values
//           departmentGroup: departmentGroupArray,
//           departmentType: departmentTypeArray,
//           employeeRole: employeeRoleArray,
//           employeeName: employeeNameArray,
//           isActive: isActive,
//       });

//       res.send('File uploaded successfully');
//   } catch (error) {
//       console.log("error saving to database", error);
//       res.status(500).send('Error saving to database');
//   }
// });
router.post("/addassigntask", upload.single('uploaddocument'), async (req, res) => {
  try {
    let uploadImagePath = '';
    if (req.file) {
      uploadImagePath = req.file.path;
    }

    const { documentname, documentdepartmenttype, tasktypes, documenttype, formlink, documentlink, documentdescription, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive, assignedby } = req.body;
    const newemp = employeeName ? employeeName.split(',').map(id => id.trim()) : [];

    console.log("Assigned By", assignedby.slice(1, -1));
    const employees = await employeename12.find({ _id: { $in: newemp } });
    console.log("employee", employees.length)
    const assignedById = new mongoose.Types.ObjectId(assignedby.slice(1, -1));

    // console.log("employees",employees)
    // console.log("employeelength",employees.length)
    // const user = await AssignTask.create({
    //   documentname,
    //   documentdepartmenttype,
    //   tasktypes,
    //   formlink,
    //   documenttype,
    //   uploaddocument,
    //   documentlink,
    //   documentdescription,
    //   locationSchema: employee.location,
    //   departmentGroup: employee.departmentGroup,
    //   departmentType: employee.departmentType,
    //   employeeRole: employee.employeeRole,
    //   employeeName: employeeName,
    //   isActive,
    //   isTemplate: false,
    // });
    if (employees.length === 0) {
      const task = await AssignTask.create({
        locationSchema: [],
        departmentGroup: [],
        departmentType: documentdepartmenttype,
        employeeRole: [],
        employeeName: [],
        isActive: isActive,
        isTemplate: false,
        documentname: documentname,
        documentdepartmenttype: documentdepartmenttype,
        tasktypes: tasktypes,
        formlink: formlink,
        documenttype: documenttype,
        documentlink: documentlink,
        documentdescription: documentdescription,
        uploaddocument: uploadImagePath,
        assignedby: assignedById,
      });
    }
    else {
      for (let i = 0; i < employees.length; i++) {
        const task = await AssignTask.create({
          locationSchema: [employees[i].location],
          departmentGroup: [employees[i].departmentGroup],
          departmentType: [employees[i].departmentType],
          employeeRole: [employees[i].employeeRole],
          employeeName: [employees[i]._id],
          isActive: isActive,
          isTemplate: false,
          documentname: documentname,
          documentdepartmenttype: documentdepartmenttype,
          tasktypes: tasktypes,
          formlink: formlink,
          documenttype: documenttype,
          documentlink: documentlink,
          documentdescription: documentdescription,
          uploaddocument: uploadImagePath,
          assignedby: assignedById,
        });
        // res.json({ success: true, data: task });

        // console.log("Taskkkkk", task);
      }

    }



  } catch (error) {
    console.log("error saving to database", error);
    res.status(500).send(error);
  }
});

// router.put("/editassigntask/:id",upload.single('uploaddocument'), async(req, res) => {
//   // console.log("image path is", req.file.path);
//   // Handle the file path as needed
//   try{
//     console.log("image path is", req.file.path);
//     // Handle the file path as needed
//     const id=req.params.id;
//     res.send('File uploaded successfully');
//     // let {documentname,documentdepartmenttype,tasktypes,documenttype,formlink,documentlink,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = await req.body;
//     //     console.log("data received",req.body);
//     //     const uploadImagePath = req.file.path;
//     //     console.log("image file path",uploadImagePath);
//         imagep=req.file.path;
//     const uploadimage=imagep;
//     console.log("image file path",uploadimage);
//          await assigntaskmaster1.create({
//              documentname:documentname,
//              documentdepartmenttype:documentdepartmenttype,
//              tasktypes:tasktypes,
//              formlink:formlink,
//              documenttype:documenttype,
//              uploaddocument:uploadimage,
//              documentlink:documentlink,
//              documentdescription:documentdescription,
//              locationSchema:locationSchema.split(","),
//              departmentGroup:departmentGroup.split(","),
//              departmentType:departmentType.split(","),
//              employeeRole:employeeRole.split(","),
//              employeeName:employeeName.split(",") ,
//              isActive:isActive,

//          })
//         }
//         catch(error){
//           console.log("error saving to database",error);
//         }});


router.post('/addassigntask', addassigntask);
router.get('/getassigntask', getAllAssignTask);
router.get('/getassigntaskbyid/:id', getAssignTaskById);
router.put('/editassigntask/:id', upload.single('uploaddocument'), editAssignTask);
router.get('/getassigntaskbyDeptid/:id', getAssignTaskByDeptId);
router.get('/getspecificassigntaskbyemployeenameid/:id', getAllAssignTaskByEmployeeId);
router.get('/getspecificassigntaskbydepartmenttypeandtasktype/:id1/:id2', GetAssignTaskByDepartmentandTaskName);
router.get('/getspecificassigntaskbydepartmenttypeandemployeename/:id1/:id2', GetAssignTaskByDepartmentTypeandEmployeeName);
router.delete('/deleteassigntask/:id', DeleteAssignTask);
router.get('/getassigntaskbyemployeeid/:id', GetAssignTaskByEmployeeId);
router.post('/assign1', listAssignedTasks)
router.post('/assignspec/:departmentType', listAssignedTasksspec)
router.get('/getassigntaskfortemplate', getAllAssignTaskForTemplate);



module.exports = router;
