const mongoose = require("mongoose");
const { Schema } = mongoose;

const templateSchema = new Schema(
  {
   
    TemplateName:
      {
        type: String
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
      
    
  },
  
  {
    timestamps: true,
  }
);


const Template = mongoose.model("Template", templateSchema);
module.exports =Template;