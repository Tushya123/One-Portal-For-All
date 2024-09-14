const express = require("express");
const { addEmployeeName, getAllEmployeeNames, getSpecificEmployeeName, editEmployeeName, deleteEmployeeName,getAllEmployeesByRole, listEmployeeNames,listEmployeeNamesspec } = require("../controllers/EmployeeNameController");




const router = express.Router();


// Routes
router.post("/adddemployeename" , addEmployeeName);
router.get("/getemployeenames" , getAllEmployeeNames);
router.get("/getemployeebyrole/:departmentTypeId", getAllEmployeesByRole);
router.get("/getemployeenamebyid/:id",getSpecificEmployeeName);
router.put("/editemployeename/:id",editEmployeeName);
router.delete("/deleteemployeename/:id",deleteEmployeeName);
router.post("/listemployeename",listEmployeeNames)
router.post("/listemployeenamespec/:departmentGroup",listEmployeeNamesspec)

module.exports = router;