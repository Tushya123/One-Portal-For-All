// Get All Types
const express = require("express");
const EmployessRoles = require("../models/rolesResponsibilities");

const getAllEmployeeRoles = async (req, res) => {
    try {
      const employeeRoles = await EmployessRoles.find({ employeeRole: req.user.employeeRole })  // Assuming the authenticated user's role is stored in req.user.employeeRole
        .populate([
          { path: 'departmentGroup', select: 'name' },
          { path: 'departmentType', select: 'name' },
        ])
        .exec();
  
      return res.json({ data: employeeRoles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Employee Roles By Group And Type
  const getEmployeeRolesByType = async (req, res) => {
    try {
      const departmentTypeId = req.params.departmentTypeId;
  
      const employeeRoles = await EmployessRoles.find({
        departmentType: departmentTypeId,
      })
        .populate([
          { path: 'departmentGroup', select: 'name' },
          { path: 'departmentType', select: 'name' },
        ])
        .exec();
  
      return res.json({ data: employeeRoles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
   
  module.exports = {
    getAllEmployeeRoles,getEmployeeRolesByType
  };