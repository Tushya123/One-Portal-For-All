const express = require("express");

const router=express.Router();


const Template = require('../models/template'); // Import the Template schema
const RolesResponsibilities=require("../models/rolesResponsibilities")

const addTemplate = async (req, res) => {
  try {
    const {
      TemplateName,
      isActive,
      Dashboard,
      MenuMaster,
      Roles,
      AdminUser,
      CommunityUpdateMaster,
      LocationMaster,
      DepartmentGroup,
      DepartmentType,
      EmployeeRole,
      Employeemaster,
      AddTask,
      AssignMaster,
      CMS,
    } = req.body;

    const newTemplate = new Template({
      TemplateName,
      isActive,
      Dashboard,
      MenuMaster,
      Roles,
      AdminUser,
      CommunityUpdateMaster,
      LocationMaster,
      DepartmentGroup,
      DepartmentType,
      EmployeeRole,
      Employeemaster,
      AddTask,
      AssignMaster,
      CMS,
    });

    const savedTemplate = await newTemplate.save();

    res.json({ success: true, data: savedTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().exec();
    const templatesCount = await Template.countDocuments();
    res.json({ success: true, data: templates, count: templatesCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const templateId = req.params.id;
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;
    const updatedFields = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(templateId, updatedFields, { new: true });

    if (!updatedTemplate) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({ success: true, data: updatedTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const templateId = req.params.id;
    console.log(templateId)

    const deletedTemplate = await Template.findByIdAndDelete(templateId);

    if (!deletedTemplate) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }
    await RolesResponsibilities.deleteMany({ template: req.params.id });


    res.json({ success: true, message: deleteTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const listTemplates = async (req, res) => {
    try {
      const { page, per_page, sorton, sortdir, match } = req.body;
  
      let query = [];
  
      // Handle match parameter
      if (match) {
        query.push({
          $match: {
            $or: [
              // Add more fields for search as needed
              { TemplateName: { $regex: match, $options: 'i' } },
            ],
          },
        });
      }
  
      // Optionally sort documents
      let sort = {};
      if (sorton && sortdir) {
        sort[sorton] = sortdir === 'desc' ? -1 : 1;
      } else {
        sort = { createdAt: -1 }; // Sort by creation date by default, adjust based on your needs
      }
      query.push({ $sort: sort });
  
      // Optionally skip and limit documents for pagination
      let skip = 0;
      if (page !== undefined && per_page !== undefined) {
        skip = (page - 1) * per_page;
        query.push({ $skip: skip });
        query.push({ $limit: per_page });
      }
  
      const list = await Template.aggregate(query).exec(); // Add .exec() to execute the aggregation
  
      res.json(list);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

module.exports = {
  addTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  listTemplates,
};
