const TaskTemplate = require("../models/TaskTemplate");
const mongoose = require("mongoose");

const addTaskTemplate = async (req, res) => {
  try {
    const { TemplateName } = req.body;

    const newTaskTemplate = new TaskTemplate({
      templateName: TemplateName.TemplateName,
      departmentName: TemplateName.departmentName,
      isActive: TemplateName.isActive,
      tasks: TemplateName.tasks,
    });

    const savedTaskTemplate = await newTaskTemplate.save();

    res.json({ success: true, data: savedTaskTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskTemplates = async (req, res) => {
  try {
    const taskTemplates = await TaskTemplate.find().exec();
    const taskTemplatesCount = await TaskTemplate.countDocuments();
    res.json({ success: true, data: taskTemplates, count: taskTemplatesCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskTemplateById = async (req, res) => {
  try {
    const templateId = req.params.id;
    const taskTemplate = await TaskTemplate.findById(templateId);

    if (!taskTemplate) {
      return res
        .status(404)
        .json({ success: false, message: "Task Template not found" });
    }

    res.json({ success: true, data: taskTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;
    const updatedFields = req.body;

    // Convert the template ID to ObjectId
    const objectIdTemplateId = new mongoose.Types.ObjectId(templateId);

    // Check if the template ID matches the restricted ID
    const restrictedId = "6654270d3110d1063bc75c30";
    const objectIdRestrictedId = new mongoose.Types.ObjectId(restrictedId);
    if (objectIdTemplateId.equals(objectIdRestrictedId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Updating this Task Template is not allowed",
        });
    }

    // Ensure the updated tasks are an array
    const updatedTasks = updatedFields.tasks || [];

    // Update the template with the new tasks and other updated fields
    const updatedTemplate = await TaskTemplate.findByIdAndUpdate(
      templateId,
      { ...updatedFields, tasks: updatedTasks },
      { new: true }
    );

    if (!updatedTemplate) {
      return res
        .status(404)
        .json({ success: false, message: "Task Template not found" });
    }

    res.json({ success: true, data: updatedTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTaskTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;

    // Convert string IDs to ObjectId
    const objectIdTemplateId = new mongoose.Types.ObjectId(templateId);
    const objectIdRestrictedId = new mongoose.Types.ObjectId(
      "6654270d3110d1063bc75c30"
    );

    // Check if the template ID matches the restricted ID
    if (objectIdTemplateId.equals(objectIdRestrictedId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Deletion of this Task Template is not allowed",
        });
    }

    const deletedTaskTemplate = await TaskTemplate.findByIdAndDelete(
      templateId
    );

    if (!deletedTaskTemplate) {
      return res
        .status(404)
        .json({ success: false, message: "Task Template not found" });
    }

    res.json({ success: true, message: "Task Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listTemplates = async (req, res) => {
  try {
    const { page, per_page, skip, sorton, sortdir, match } = req.body;

    let query = [];

    if (match) {
      query.push({
        $match: {
          $or: [
            { templateName: { $regex: match, $options: "i" } },
            { departmentName: { $regex: match, $options: "i" } },
          ],
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === "desc" ? -1 : 1;
    } else {
      sort = { name: 1 }; // Adjust based on your field names
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
          data: [{ $skip: skip }, { $limit: per_page }],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$count.total", 0] },
          data: 1,
        },
      }
    );

    const templates = await TaskTemplate.aggregate(query).exec();

    res.json(templates);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = {
  addTaskTemplate,
  getTaskTemplates,
  getTaskTemplateById,
  updateTaskTemplate,
  deleteTaskTemplate,
  listTemplates,
};
