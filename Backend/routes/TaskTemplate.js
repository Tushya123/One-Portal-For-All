const express = require("express");
const { addTaskTemplate,
    getTaskTemplates,
    getTaskTemplateById,
    updateTaskTemplate,
    deleteTaskTemplate, listTemplates } = require("../controllers/TaskTemplate");
const router = express.Router();


// Routes
router.post("/addTaskTemplate", addTaskTemplate);
router.get("/getTaskTemplates", getTaskTemplates);
// router.get('/getRolesResponsibilityById/:id', getRolesResponsibilityById);
router.get("/getTaskTemplateById/:id", getTaskTemplateById);
router.put("/updateTaskTemplate/:id", updateTaskTemplate);
router.post("/listTemplates", listTemplates)
router.delete("/deleteTaskTemplate/:id", deleteTaskTemplate);
module.exports = router;



