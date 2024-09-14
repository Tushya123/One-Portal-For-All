const mongoose = require("mongoose");
const { Schema } = mongoose;

const RolesResponsibility = new mongoose.Schema(
  {

    locationSchema:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },

    departmentGroup:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentGroup",
    },

    departmentType:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentType",
    },

    employeeRole:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employeerole",
    },

    employeeName:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employeename",
    },

    template:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    tasktemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskTemplate",
    },
    isActive: {
      type: Boolean,

    },
    Dashboard: {
      type: Boolean,

    },
    MenuMaster: {
      type: Boolean,

    },
    Roles: {
      type: Boolean,

    },
    AdminUser: {
      type: Boolean,

    },
    CommunityUpdateMaster: {
      type: Boolean,

    },
    LocationMaster: {
      type: Boolean,

    },
    DepartmentGroup: {
      type: Boolean,

    },
    DepartmentType: {
      type: Boolean,

    },
    EmployeeRole: {
      type: Boolean,

    },
    Employeemaster: {
      type: Boolean,

    },
    AddTask: {
      type: Boolean,

    },
    AssignMaster: {
      type: Boolean,

    },
    CMS: {
      type: Boolean,
    },
    email: {
      type: String,
      // required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    },
    password: {
      type: String,
      // required: true,
      minlength: 8,
    },
  },

  {
    timestamps: true,
  }
);

const RolesResponsibilities = mongoose.model("RolesResponsibilities", RolesResponsibility);

module.exports = RolesResponsibilities;