const express = require("express");
const AddTask = require('../models/AddTaskModel');
const AssignTask = require("../models/AssignTaskMaster")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const addingtask = async (req, res) => {
  try {
    const { departmentType, taskName, taskType, accessLocation, detail, isActive } = req.body;
    const newAddTask = new AddTask({ departmentType, taskName, taskType, accessLocation, detail, isActive });
    const savedDepartmentType = await newAddTask.save();
    return res.json({ success: true, data: savedDepartmentType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getalltask = async (req, res) => {
  try {
    const task = await AddTask.find()
      .populate('departmentType', 'name isActive')
      .exec();

    const formTasks = task.filter(task => task.taskType === 'Form');
    const formTasksCount = formTasks.length;
    // const count=task.data.taskType.length;
    return res.json({ data: task, formTasksCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletetask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedtask = await AddTask.findByIdAndDelete(id);

    if (!deletedtask) {
      return res.status(404).json({ error: 'group not found' });
    }
    await AssignTask.deleteMany({ tasktypes: id });

    return res.json({ success: true, msg: "Add Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getspecificaddtask = async (req, res) => {
  try {
    const id = req.params.id; // Accessing the _id from route parameters
    const addtask = await AddTask.findById(id).populate('departmentType', 'name');

    if (!addtask) {
      return res.status(404).json({ error: 'Data not found' });
    }

    return res.json({ success: true, data: addtask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getspecifictaskbydepartmenttypeid = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await AddTask.find({ departmentType: id });

    if (!tasks) {
      return res.status(404).json({ error: ' not found' });
    }

    return res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSpecificTaskByDepartmentTypeId = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await AddTask.find({ departmentType: id })
      .populate('departmentType', 'name')
      .exec();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: 'Tasks not found' });
    }

    return res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const editAddTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { departmentType, taskName, taskType, accessLocation, detail, isActive } = req.body;

    const updatedDepartmentType = await AddTask.findByIdAndUpdate(
      id,
      { departmentType, taskName, taskType, accessLocation, detail, isActive },
      { new: true }
    );

    if (!updatedDepartmentType) {
      return res.status(404).json({ error: 'Type not found' });
    }

    return res.json({ success: true, data: updatedDepartmentType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByDepartmentType = async (req, res) => {
  try {
    const departmentTypeId = req.params.id;

    // Check if departmentTypeId is provided in the request
    if (!departmentTypeId) {
      return res.status(400).json({ error: 'DepartmentTypeId parameter is missing in the request' });
    }

    // Fetch tasks based on the provided departmentTypeId
    const tasks = await AddTask.find({ 'departmentType': departmentTypeId })
      .populate('departmentType', 'name isActive')
      .exec();

    const formTasks = tasks.filter(task => task.taskType === 'Form');
    const formTasksCount = formTasks.length;

    return res.json({ data: tasks, formTasksCount });
  } catch (error) {
    console.error("Error during API call:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const listTasks = async (req, res) => {
  try {
    const { page, per_page, skip, sorton, sortdir, match } = req.body;

    let query = [];
    query.push(
      {
        $lookup: {
          from: "departmenttypes",
          localField: "departmentType",
          foreignField: "_id",
          as: "documentdepartmenttype"
        }
      },
      { $unwind: { path: "$documentdepartmenttype", preserveNullAndEmptyArrays: true } },)

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { taskName: { $regex: match, $options: 'i' } },
            { taskType: { $regex: match, $options: 'i' } },
            { accessLocation: { $regex: match, $options: 'i' } },
            { detail: { $regex: match, $options: 'i' } },
            { "documentdepartmenttype.name": { $regex: match, $options: 'i' } },
          ],
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { taskName: 1 }; // Adjust based on your field names
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    // let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }
    query.push(
      {
        $facet: {
          count: [{ $count: "total" }],
          data: [
            { $skip: skip },
            { $limit: per_page },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$count.total", 0] },
          data: 1,
        },
      }
    );

    const populatedTaskList = await AddTask.aggregate(query).exec(); // Add .exec() to execute the aggregation

    // Populate departmentType field with its name
    // const populatedTaskList = await AddTask.populate(taskList, {
    //   path: 'departmentType',
    //   select: 'name',
    // });

    console.log('Query result:', populatedTaskList);
    res.json(populatedTaskList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const listTasksspec = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.query;
    const { departmentType } = req.params;

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { taskName: { $regex: match, $options: 'i' } },
            { taskType: { $regex: match, $options: 'i' } },
            { accessLocation: { $regex: match, $options: 'i' } },
            { detail: { $regex: match, $options: 'i' } },
          ],
        },
      });
    }

    // Handle departmentType filter
    if (departmentType) {
      query.push({
        $match: {
          departmentType: new mongoose.Types.ObjectId(departmentType),
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { taskName: 1 }; // Adjust based on your field names
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }

    const taskList = await AddTask.aggregate(query).exec(); // Add .exec() to execute the aggregation

    // Populate departmentType field with its name
    const populatedTaskList = await AddTask.populate(taskList, {
      path: 'departmentType',
      select: 'name',
    });

    console.log('Query result:', populatedTaskList);
    res.json(populatedTaskList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};




module.exports = {
  addingtask,
  getalltask,
  deletetask,
  getspecificaddtask,
  editAddTask,
  getspecifictaskbydepartmenttypeid,
  getAllSpecificTaskByDepartmentTypeId,
  getTasksByDepartmentType,
  listTasks,
  listTasksspec

};