const express = require("express");
const { addTemplate,
    getTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
    listTemplates } = require("../controllers/Template");
const router = express.Router();


// Routes
router.post("/addTemplate", addTemplate);
router.get("/getTemplates", getTemplates);
// router.get('/getRolesResponsibilityById/:id', getRolesResponsibilityById);
router.get("/getTemplateById/:id", getTemplateById);
router.put("/updateTemplate/:id", updateTemplate);
router.post("/listTemplates", listTemplates)
router.delete("/deletetemplate/:id", deleteTemplate)
module.exports = router;



