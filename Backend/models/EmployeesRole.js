const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeRole = new mongoose.Schema(

{
    departmentGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentGroup",
    },
    departmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentType",
    },
    EmployeeRole : String,
    isActive : {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
  }
);

const EmployeeRoles = mongoose.model ("Employeerole" , employeeRole);

module.exports = EmployeeRoles;
