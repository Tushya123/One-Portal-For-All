const express = require("express");
const { addRole, getSelectedRolePermission, getRoles } = require("../controllers/rolesController");
const router = express.Router();


// Routes
router.post("/addrole" , addRole);
router.post("/getrolespecificpermisson" , getSelectedRolePermission);
router.get("/getroles",getRoles);






module.exports = router;


