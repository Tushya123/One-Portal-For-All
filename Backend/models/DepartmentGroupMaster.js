const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentGroup = new mongoose.Schema(
  {
    name: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DepartmentGroup = mongoose.model("DepartmentGroup", departmentGroup);

module.exports = DepartmentGroup;
