const mongoose = require("mongoose");
const { Schema } = mongoose;

const tasktemplateSchema = new Schema(
    {
        templateName: {
            type: String
        },
        departmentName: {
            type: String,
        },
        isActive: {
            type: Boolean,
        },
        tasks: [{
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'AssignTaskMaster'
            },
            name: String
        }],
    },
    {
        timestamps: true,
    }
);


const TaskTemplate = mongoose.model("TaskTemplate", tasktemplateSchema);
module.exports = TaskTemplate;