const mongoose = require("mongoose");
const { Schema } = mongoose;

const PinnedItemsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminName",
    //   required: true,
    },
    RolesResponsibility:{
      type: Boolean,
    },
    AdminUser:{
      type: Boolean,
    },
    Template:{
      type:Boolean,
    },
    Dashboard: {
      type: Boolean,
    //   required: true,
    },
    MenuMaster: {
      type: Boolean,
    //   required: true,
    },
    CommunityUpdateMaster: {
      type: Boolean,
    //   required: true,
    },
    LocationMaster: {
      type: Boolean,
    //   required: true,
    },
    DepartmentGroup: {
      type: Boolean,
    //   required: true,
    },
    DepartmentType: {
      type: Boolean,
    //   required: true,
    },
    EmployeeRole: {
      type: Boolean,
    //   required: true,
    },
    Employeemaster: {
      type: Boolean,
    //   required: true,
    },
    AddTask: {
      type: Boolean,
    //   required: true,
    },
    AssignMaster: {
      type: Boolean,
    //   required: true,
    },
  },
  {
    // timestamps: true,
  }
);

const PinnedItemsModel = mongoose.model("PinnedItems", PinnedItemsSchema);

module.exports = PinnedItemsModel;
