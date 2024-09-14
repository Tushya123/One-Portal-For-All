const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new mongoose.Schema(

{
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

const Location = mongoose.model ("Location" , locationSchema);

module.exports = Location;
