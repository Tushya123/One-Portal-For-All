const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {getTasksByDepartmentType,addingtask,getalltask,deletetask,getspecificaddtask, editAddTask,getspecifictaskbydepartmenttypeid,getAllSpecificTaskByDepartmentTypeId, listTasks,listTasksspec}=require("../controllers/AddTaskController")

router.post('/addnewtask',addingtask);
router.get('/getalltask',getalltask);
router.get('/gettaskbyId/:id',getTasksByDepartmentType);
router.delete('/deletetask/:id',deletetask);
router.get('/getspecifictask/:id',getspecificaddtask)
router.post("/edittask/:id",editAddTask);
router.get("/getalltaskbydtype/:id",getspecifictaskbydepartmenttypeid);
router.get("/getallspecifictaskbydtype/:id",getAllSpecificTaskByDepartmentTypeId);
router.post('/getassignlist',listTasks);
// router.post('/getassignlist/:departmentTypeId', listTasks);
router.post('/getassignlist/:departmentType', listTasksspec);

module.exports = router;