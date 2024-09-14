const mongoose = require("mongoose");
const { Schema } = mongoose;
const addTask = new mongoose.Schema(

    {
        departmentType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DepartmentType",
        },
        taskName:{
            type: String,
        },
        taskType:{
            type: String,
            enum:['Form','Data'],
        },
        accessLocation:{
            type:String,

        },
        detail:{
            type:String,

        },
        isActive : {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
     }
    );

    const AddTask = mongoose.model ("AddTask" , addTask);

    module.exports = AddTask;    