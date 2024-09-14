const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectToMongo = ()=>{
    mongoose.connect("mongodb+srv://websupport:websupport@cluster0.branmie.mongodb.net/OPA_database?retryWrites=true&w=majority").then(()=>{
        console.log("connection successful"); 
    })
}

module.exports = connectToMongo;