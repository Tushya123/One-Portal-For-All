const express = require("express");
const { addRolesResponsibility,
    getRolesResponsibilities,
    getRolesResponsibilityById, editRolesResponsibility,
    getSpecificRolesResponsibility,
    listRolesResponsibilities, deleterolesresponsibility, deleteTemplateTask } = require("../controllers/RolesRsponsibilities");
const router = express.Router();


// Routes
router.post("/addRolesResponsibilities/:id", addRolesResponsibility);
router.get("/getRolesResponsibilities", getRolesResponsibilities);
// router.get('/getRolesResponsibilityById/:id', getRolesResponsibilityById);
router.get("/getRolesResponsibilitybyid/:id", getSpecificRolesResponsibility);
router.put("/ediRolesResponsibility/:id", editRolesResponsibility);
router.post("/listroles", listRolesResponsibilities)
router.delete("/deleterolesbyid/:id", deleterolesresponsibility);
router.delete("/deleteTemplateTask/:employeeName", deleteTemplateTask);
module.exports = router;


