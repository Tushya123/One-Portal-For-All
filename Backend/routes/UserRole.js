const express = require("express");
const { getEmployeeRolesByType, getAllEmployeeRoles } = require("../controllers/Userrole");


const router = express.Router();


// Routes
router.get("/adduserrole" , getEmployeeRolesByType);
router.get("/getuserroles" , getAllEmployeeRoles);

module.exports = router;