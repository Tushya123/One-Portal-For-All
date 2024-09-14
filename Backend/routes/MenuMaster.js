const express = require("express");
const {addMenuMaster,getAllMenuMaster, deleteMenuMaster, getSpecificMenuMaster, editMenuMaster,listMenuMaster}=require("../controllers/MenuMasterController")
const router = express.Router();

router.post('/addmenumaster',addMenuMaster);
router.get('/getallmenumaster',getAllMenuMaster);
router.delete('/deletemenu/:id',deleteMenuMaster);
router.get('/getspecificmenu/:id',getSpecificMenuMaster);
router.post('/editmenumaster/:id',editMenuMaster)
router.post('/listbyparamsmenu',listMenuMaster)
module.exports = router;

