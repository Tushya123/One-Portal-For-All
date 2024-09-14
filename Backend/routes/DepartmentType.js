const express = require("express");

const { addDepartmentType, getAllDepartmentType, getSpecificDepartmentType, editDepartmentType, deleteDepartmentType, getDepartmentTypesByGroupId,getalldtype,listDepartmentType } = require("../controllers/DepartmentType");



const router = express.Router();


// Routes
router.post("/adddepartmenttype" , addDepartmentType);
router.get("/getAlldepartmentstypes" , getAllDepartmentType);
router.get("/getdepartmentstypes" , getAllDepartmentType);
router.get("/getdepartmenttypebyid/:id",getSpecificDepartmentType);
router.post("/editdepartmenttype/:id",editDepartmentType);
router.post('/getdeptypeforpagination',listDepartmentType);
router.post("/deletedepartmenttype/:id",deleteDepartmentType);
router.get("/departmenttypebygroup/:id",getDepartmentTypesByGroupId);
router.get("/newgetalldeptype",getalldtype);

module.exports = router;