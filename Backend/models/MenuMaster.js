const mongoose = require("mongoose");
const { Schema } = mongoose;
const menumaster = new mongoose.Schema(
  {
    menugroup: {
      type: String,
    },
    menuname: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menumaster = mongoose.model("MenuMaster", menumaster);

module.exports = Menumaster;
