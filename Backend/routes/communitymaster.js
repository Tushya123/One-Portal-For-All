const express = require("express");
// const router=require(express).Router();
const { getalllocationcommunitydetails, getReginalcommunitydetails, getAllReginalcommunitydetails, deleteCommunity, getallcommunitydetails, getSpecificCommunityMaster, getCommunityByGroupAndTypeAndRoleAndAccess, getallcommunitydetailsbylocation, getallcommunitydetailsbyname, listCommunityMaster, listspeccommmaster } = require("../controllers/CommunityUpdateMaster");
// const upload = require("../middlewares/multerMiddleware");
const upload = require("../middlewares/multerMiddleware");
const communityMaster = require("../models/CommunityMaster");
const locationSchema1 = require("../models/LocationMaster");
const departmentGroup1 = require("../models/DepartmentGroupMaster");
const departmentType1 = require("../models/DepartmentType");
const employeeRole1 = require("../models/EmployeesRole");
const employeeName1 = require("../models/EmployeeName");
const path = require("path");
const router = express.Router();
// const sharp=require()
const sharp = require("sharp");


// Routes
//router.post("/addcommunitymessages",addCommunityMessages);
router.post("/addcommunitymessages", upload.single('uploadimage'), async (req, res) => {
  try {
    const uploadImagePath = req.file.path;
    console.log("Image path is", uploadImagePath);

    const {
      name,
      message,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive
    } = req.body;

    console.log("Data received", req.body);

    let locations = [];
    let employeeNames = [];
    let employeeRoles = [];
    let departmentGroups = [];
    let departmentTypes = [];

    let isReginal;

    if (locationSchema === "all") {
      isReginal = false;

      const [locationsRes, empNamesRes, empRolesRes, deptTypesRes, deptGroupsRes] = await Promise.all([
        locationSchema1.find(),
        employeeName1.find(),
        employeeRole1.find(),
        departmentType1.find(),
        departmentGroup1.find()
      ]);

      locations = locationsRes.map(loc => loc._id);
      employeeNames = empNamesRes.map(emp => emp._id);
      employeeRoles = empRolesRes.map(role => role._id);
      departmentTypes = deptTypesRes.map(type => type._id);
      departmentGroups = deptGroupsRes.map(group => group._id);
    } else {
      isReginal = true;

      locations = locationSchema.split(",").filter(item => item);
      employeeNames = employeeName.split(",").filter(item => item);
      employeeRoles = employeeRole.split(",").filter(item => item);
      departmentTypes = departmentType.split(",").filter(item => item);
      departmentGroups = departmentGroup.split(",").filter(item => item);
    }

    await communityMaster.create({
      name,
      message,
      locationSchema: locations,
      departmentGroup: departmentGroups,
      departmentType: departmentTypes,
      employeeRole: employeeRoles,
      employeeName: employeeNames,
      isActive,
      isReginal,
      uploadimage: uploadImagePath
    });

    res.send('File uploaded and data saved successfully');
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send('Internal Server Error');
  }
});
//router.post("/upload", upload.single('uploadimage'),(req,res)=>{
//	console.log("image path is",req.file.filepath);
//});


router.get("/getrequiredcommunitymessage", getallcommunitydetails);
router.get("/getalllocationcommunitydetails", getalllocationcommunitydetails);
router.get("/getReginalcommunitydetails/:locationid", getReginalcommunitydetails);
router.get("/getAllReginalcommunitydetails", getAllReginalcommunitydetails);

router.post("/communitylist", listCommunityMaster);

// router.post("/getemployeerolebyid/:id",getSpecificEmployeeRole);
router.put("/editcommunitymessages/:id", upload.single('uploadimage'), async (req, res) => {
  const id = req.params.id;

  try {
    const {
      name,
      message,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive
    } = req.body;

    let locations = [];
    let employeeNames = [];
    let employeeRoles = [];
    let departmentGroups = [];
    let departmentTypes = [];

    let isReginal;

    if (locationSchema === "all") {
      isReginal = false;

      const [locationsRes, empNamesRes, empRolesRes, deptTypesRes, deptGroupsRes] = await Promise.all([
        locationSchema1.find(),
        employeeName1.find(),
        employeeRole1.find(),
        departmentType1.find(),
        departmentGroup1.find()
      ]);

      locations = locationsRes.map(loc => loc._id);
      employeeNames = empNamesRes.map(emp => emp._id);
      employeeRoles = empRolesRes.map(role => role._id);
      departmentTypes = deptTypesRes.map(type => type._id);
      departmentGroups = deptGroupsRes.map(group => group._id);
    } else {
      isReginal = true;

      locations = locationSchema.split(",").filter(item => item);
      employeeNames = employeeName.split(",").filter(item => item);
      employeeRoles = employeeRole.split(",").filter(item => item);
      departmentTypes = departmentType.split(",").filter(item => item);
      departmentGroups = departmentGroup.split(",").filter(item => item);
    }

    let uploadimage = req.file ? req.file.path : '';
    if (!uploadimage) {
      const communityMessage = await communityMaster.findById(id);
      if (communityMessage) {
        uploadimage = communityMessage.uploadimage;
      }
    }

    const updatedCommunityMaster = await communityMaster.findByIdAndUpdate(id, {
      name: name,
      message: message,
      locationSchema: locations,
      departmentGroup: departmentGroups,
      departmentType: departmentTypes,
      employeeRole: employeeRoles,
      employeeName: employeeNames,
      isActive: isActive,
      isReginal: isReginal,
      uploadimage: uploadimage,
    }, { new: true });

    res.json({ success: true, data: updatedCommunityMaster });
  } catch (error) {
    console.error("Error updating community message:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.delete("/deleteCommunity/:id", deleteCommunity);
router.get("/getspecificcommunitymessage/:id", getSpecificCommunityMaster);
router.get("/getrequiredcommunitymessagebylocation/:id", getallcommunitydetailsbylocation);
// router.get("/getrequiredcommunitymessagebynames/:employeeName/:locationSchema", getallcommunitydetailsbyname);
router.get("/getrequiredcommunitymessagebynames", getallcommunitydetailsbyname);

router.post("/listspeccommmaster/:employeeName", listspeccommmaster);
//router.get


module.exports = router;