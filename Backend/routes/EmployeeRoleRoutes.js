const express = require("express");
const { getEmployeeRolesByDepartmentType,addEmployeeRole, getAllEmployeeRoles, getSpecificEmployeeRole, editEmployeeRole, deleteEmployeeRole, getEmployeeRolesByGroupAndType, listEmployeeRoles } = require("../controllers/EmployeeRoleController");


const router = express.Router();


// Routes
router.post("/adddemployeerole" , addEmployeeRole);
router.get("/getemployeeroles" , getAllEmployeeRoles);
router.get("/getemployeerolebyid/:id",getSpecificEmployeeRole);
router.post("/editemployeerole/:id",editEmployeeRole);
router.post("/deleteemployerole/:id",deleteEmployeeRole);
router.get("/getEmployeeRolesByDType/:departmentTypeId",getEmployeeRolesByDepartmentType)
router.get("/getemployeerolebygroupandtype/:departmentGroupId/:departmentTypeId",getEmployeeRolesByGroupAndType);
router.post('/employeeroleforpagination',listEmployeeRoles)

module.exports = router;