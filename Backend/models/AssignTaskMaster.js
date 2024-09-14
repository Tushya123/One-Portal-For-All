const mongoose = require("mongoose");
const { Schema } = mongoose;
const assigntaskmaster = new mongoose.Schema(
  {
    documentname: {
      type: String,
    },
    documentdepartmenttype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentType",
    },
    tasktypes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddTask",
    },
    formlink: {
      type: String,
    },
    documenttype: {
      type: String,
    },
    uploaddocument: {
      type: String,
    },
    documentlink: {
      type: String,
    },
    documentdescription: {
      type: String,
    },
    locationSchema: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    departmentGroup: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentGroup",
      },
    ],
    departmentType: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentType",
      },
    ],
    employeeRole: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employeerole",
      },
    ],
    employeeName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employeename",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
    assignedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adminname",
      default: null
    },
    isTemplate: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);
const AssignTaskMaster = mongoose.model("AssignTaskMaster", assigntaskmaster);

module.exports = AssignTaskMaster;
