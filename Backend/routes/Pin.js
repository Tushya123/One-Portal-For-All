const express = require("express");
const {getPinnedItems,
    createPinnedItem,
    updateDepartmentGroup,
    updateDepartmentType,
    updateEmployeeRole,
    updateEmployeemaster,
    updateLocationMaster,
    updateAdminUser,
    updateCommunityUpdateMaster,
    updateAddTask,
    updateAssignMaster,
    updateRolesResponsibility,
    updateTemplate,
    updateMenuMaster
} = require("../controllers/Pin");

const router = express.Router();
router.get("/getPinnedItemsbyid/:userId",getPinnedItems);
router.post("/createPinnedItem/:id", createPinnedItem);
router.post("/updateDepartmentGrp/:id", updateDepartmentGroup);
router.post("/updateDepartmentType/:id", updateDepartmentType);
router.post("/updateEmployeeRole/:id", updateEmployeeRole);
router.post("/updateEmployeeMaster/:id", updateEmployeemaster);
router.post("/updateLocationMaster/:id", updateLocationMaster);
router.post("/updateRolesResponsibility/:id", updateRolesResponsibility);
router.post("/updateAdminUser/:id", updateAdminUser);
router.post("/updateCommunityUpdateMaster/:id", updateCommunityUpdateMaster);
router.post("/updateMenuMaster/:id", updateMenuMaster);
// router.post("/updateDashboard/:id", updateDashboard);
router.post("/updateAddTask/:id", updateAddTask);
router.post("/updateAssignMaster/:id", updateAssignMaster);
router.post("/updateTemplate/:id",updateTemplate)
module.exports = router;
