const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentType = new mongoose.Schema(

{
    departmentGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentGroup",
    },
    name : String,
    isActive : {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
}
);

const DepartmentType = mongoose.model ("DepartmentType" , departmentType);

module.exports = DepartmentType;
