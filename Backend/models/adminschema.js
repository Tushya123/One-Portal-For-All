const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminName = new mongoose.Schema(
  {
    name: String,
    email:{
      type: String,
      required: true,
      

  },
  password:{
    type: String,
    required: true,

},
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    departmentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentGroup",
    },
    departmentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentType",
    },
    roles: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },  
  

    status: String,
    image: {
      type: String,
    },
  
  
    },
  {
    timestamps: true,
  },
);

const AdminName = mongoose.model("Adminname", adminName);

module.exports = AdminName;
