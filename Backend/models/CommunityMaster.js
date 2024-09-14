const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommunityMaster = new mongoose.Schema(
  {
    name: String,
    uploadimage: {
      type: String,
      required: true,
    },

    message: String,
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

    isReginal: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const communityMaster = mongoose.model("CommunityMaster", CommunityMaster);

module.exports = communityMaster;