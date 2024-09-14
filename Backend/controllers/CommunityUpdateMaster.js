const express = require("express");
// const DepartmentGroup = require("../models/DepartmentGroupMaster");
const communityMaster = require("../models/CommunityMaster");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const LocationMaster = require("../models/LocationMaster")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
// const departmentgroup=require("../models/DepartmentGroupMaster")
// const departmentType=require("../models/DepartmentType")
// const employeename=require("../models/EmployeeName")
// const employeerole=require("../models/EmployeesRole");



// departmentType.aggregate([
//   {
//     $lookup:{
//       from:"departmentgroup",
//       localField:"departmentGroup",
//       foreignField:"_id",
//       as:"matchedFields"
//     }
//   },
//   {
//     $addfields:{
//       matchedIds:{
//         $map:{
//           input:"$matchedDocs",
//           as:"matchedField",
//           in:"$$matchedField.commonId"
//         }
//       }
//     }
//   },
//   {
//     $addfields:{
//       commonIdsInBothCollections:{
//         $filter:{
//           input:"$_id",
//           as:"_id",
//           cond:{$in:["$$_id","$matchedIds"]}
//           console.log(matchedIds);
//         }
//       }
//     }
//   }
// ]);


// const getdepartmenttypecommonwithdeptgrp=async()=>{
//   try{
// const departmenttype=await departmentType.find({departmentgroup.map:req.body.departmentGroup})
// res.status(200).send({success:true,msg:'Department Type Data',data:departmenttype})
//   }
//   catch(error){
//     res.status(400).send({success:false,msg:error.message})
//   }
// }


// Add Community 
const addCommunityMessages = async (req, res) => {
  try {

    // console.log(req.file);  // Log the file details
    // console.log(req.body);
    //    const id=req.params.id;
    //const photo=req.file.path;
    const { name, message, locationSchema, departmentGroup, departmentType, employeeRole, employeeName, isActive } = req.body;
    // console.log("data received",req.body);
    const uploadImagePath = req.file.path;
    // console.log("image file path",uploadImagePath);
    // console.log(uploadimage);
    const user = await communityMaster.create({
      name: name,
      message: message,
      locationSchema: locationSchema,
      departmentGroup: departmentGroup,
      departmentType: departmentType,
      employeeRole: employeeRole,
      employeeName: employeeName,
      isActive: isActive,
      uploadimage: uploadImagePath,
    })
    try {
      router.post('/uploads', upload.single('uploadimage'), (req, res) => {
        // Handle the uploaded file, you can get the file details from req.file
        res.send('File uploaded successfully!');
        // console.log("image done",uploadImagePath);
      });
    }
    catch (error) {
      // console.log("error",error);
    }

    return res.json({ success: true, user });
  }

  catch (error) {
    res.status(500).json({ error: error.message });
    // console.log(error)
  }
};



// Edit Community
const editCommunityMessages = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, uploadimage, message, locationSchema, departmentGroup, departmentType, employeeRole, roleSchema, isActive } = req.body;

    const updatedcommunitygroup = await CommunityMaster.findByIdAndUpdate(
      id,
      { name, uploadimage, message, locationSchema, departmentGroup, departmentType, employeeRole, roleSchema, isActive },
      { new: true },
    );

    if (!updatedcommunitygroup) {
      return res.status(404).json({ error: 'community not found' });
    }

    return res.json({ success: true, data: updatedcommunitygroup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete community
const deleteCommunity = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedcommunitygroup = await communityMaster.findByIdAndDelete(id);

    if (!deletedcommunitygroup) {
      return res.status(404).json({ error: 'group not found' });
    }

    return res.json({ success: true, msg: "Department Group Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All community details
const getallcommunitydetails = async (req, res) => {
  try {
    const communitymaster = await communityMaster.find().populate([
      // {path:'locationSchema',select:'name'},
      // {path:'uploadimage'},
      // {path:'name'},
      // {path:'message'},
      // {path:'isActive'},

      // {path:'departmentGroup',select:'name'},
      // {path:'departmentType',select:'name departmentGroup'},
      // {path:'employeeRole',select:'EmployeeRole departmentGroup departmentType'},
    ]).exec();
    const count = communitymaster.length;
    return res.json({ data: communitymaster, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Adjust the path based on your project structure

const listCommunityMaster = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { name: { $regex: match, $options: "i" } },
            { message: { $regex: match, $options: "i" } },
            { isActive: { $regex: match, $options: "i" } },
          ],
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === "desc" ? -1 : 1;
    } else {
      sort = { name: 1 }; // Adjust based on your field names
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }
    query.push(
      {
        $facet: {
          count: [{ $count: "total" }],
          data: [
            { $skip: skip },
            { $limit: per_page },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$count.total", 0] },
          data: 1,
        },
      }
    );
    const populatedList = await communityMaster.aggregate(query).exec(); // Add .exec() to execute the aggregation
    // const populatedList = await communityMaster.populate(list, [

    // ]);

    console.log("Query result:", populatedList);
    res.json(populatedList);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};




// Get Specific Community Details

//     //  const  id  = req.params.id;
//   // try {
//   //   const  id  = req.params.id;
//   //   const Communitygroup = await communityMaster.findById(id).populate([
//   //     {path:'locationSchema',select:'name'},
//   //     {path:'departmentGroup',select:'name'},
//   //     {path:'departmentType',select:'name'},
//   //     {path:'employeeRole',select:'EmployeeRole'},
//   //     {path:'roleSchema',select:'role'},

//   //   ]);

//   //   if (!Communitygroup) {
//   //     return res.status(404).json({ error: 'group not found' });
//   //   }

//   //  return res.json({success : true , data:Communitygroup});

//     // Use $elemMatch to find a document where an item's _id matches the provided itemId
//   //   const document = await communityMaster.findOne({
//   //     department: { $elemMatch: { _id: id } }, // Assuming itemId is a string
//   //   });

//   //   if (!document) {
//   //     return res.status(404).json({ error: 'Document not found' });
//   //   }

//   //   // Handle the found document as needed
//   //   res.json(document);

//   // } catch (error) {
//   //   res.status(500).json({ error: error.message });
//   // }
const getSpecificCommunityMaster = async (req, res) => {
  const id = req.params.id;
  try {
    const Communitygroup = await communityMaster.findById(id).populate([
      { path: 'name' },
      { path: 'message' },
      { path: 'uploadimage' },
      { path: 'locationSchema', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },
      { path: 'employeeRole', select: 'EmployeeRole' },
      { path: 'employeeName', select: 'name' },

    ]);

    if (!Communitygroup) {
      return res.status(404).json({ error: 'group not found' });
    }

    return res.json({ success: true, data: Communitygroup });



  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCommunityByGroupAndTypeAndRoleAndAccess = async (req, res) => {
  try {
    // const locationId=req.params.locationId;
    const departmentGroupId = req.params.departmentGroupId;
    const departmentTypeId = req.params.departmentTypeId;
    // const employeeRoleId = req.params.employeeRoleId;
    // const employeeAccessId = req.params.employeeAccessId;
    const items = [];

    const comaster = await departmentGroup.find({
      // departmentGroup: departmentGroupId
      items: { $elemMatch: { departmentGroupId: departmentType.departmentGroup } }

    })
      .populate([
        { path: 'locationSchema', select: 'name' },
        { path: 'departmentGroup', select: 'name' },
        { path: 'departmentType', select: 'name' },
        { path: 'employeeRole', select: 'EmployeeRole' },
        { path: 'roleSchema', select: 'role' },
      ])
      .exec();

    return res.json({ data: comaster });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getallcommunitydetailsbylocation = async (req, res) => {
  const { id } = req.params;
  // console.log(id)// Assuming the locationId is passed as a route parameter

  try {
    const communityDetails = await communityMaster.find({
      locationSchema: { $in: [id] }
    }).populate([
      { path: 'locationSchema', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name departmentGroup' },
      { path: 'employeeRole', select: 'EmployeeRole departmentGroup departmentType' },
    ]).exec();

    // Format the response to match the structure of your other APIs
    const formattedResponse = {
      data: communityDetails,
    };

    return res.json(formattedResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getallcommunitydetailsbyname = async (req, res) => {
  const { employeeName, locationSchema } = req.query;

  try {
    const employeeObjectId = new mongoose.Types.ObjectId(employeeName);
    const locationObjectId = new mongoose.Types.ObjectId(locationSchema);

    const communityDetails = await communityMaster.find({
      employeeName: employeeObjectId,
      locationSchema: locationObjectId
    }).populate([
      { path: 'locationSchema', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name departmentGroup' },
      { path: 'employeeRole', select: 'EmployeeRole departmentGroup departmentType' },
      { path: 'employeeName', select: 'name' },
    ]).exec();

    if (!communityDetails || communityDetails.length === 0) {
      return res.status(404).json({ error: 'No data found for the provided IDs' });
    }

    // Format the response to match the structure of your other APIs
    const formattedResponse = {
      data: communityDetails,
    };

    return res.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching community details:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};


const listspeccommmaster = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;
    const { employeeName } = req.params; // Extract departmentType from req.params

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { name: { $regex: match, $options: 'i' } },
            // Add more fields for search as needed
          ],
        },
      });
    }

    // Optionally filter by departmentType
    if (employeeName) {
      query.push({
        $match: {
          employeeName: new mongoose.Types.ObjectId(employeeName), // Assuming documentdepartmenttype is the field name
        },
      });
    }

    // Optionally sort documents based on employeeName
    let sort = {};
    if (sorton === 'employeeName' && sortdir) {
      sort['employeeName'] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { name: 1 }; // Default sorting by name if not specified
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }

    // Execute the aggregation query
    const communityUpdateMasterList = await communityMaster.aggregate(query).exec();

    // Populate necessary fields
    const populatedCommunityUpdateMasterList = await communityMaster.populate(communityUpdateMasterList, [
      { path: 'locationSchema', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name departmentGroup' },
      { path: 'employeeRole', select: 'EmployeeRole departmentGroup departmentType' },
      { path: 'employeeName', select: 'name' },
    ]);

    // Send the response
    res.json(populatedCommunityUpdateMasterList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const getalllocationcommunitydetails = async (req, res) => {
  try {
    const communitymaster = await communityMaster.find({ isReginal: false }).populate([
    ]).exec();
    const count = communitymaster.length;
    return res.json({ data: communitymaster, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReginalcommunitydetails = async (req, res) => {
  try {
    const { locationid } = req.params;  // Extract the location ID from the request parameters
    const communitymaster = await communityMaster.find({
      isReginal: true,
      locationSchema: locationid  // Match the location ID
    }).populate([
      // Add any fields you want to populate here
    ]).exec();

    const count = communitymaster.length;
    return res.json({ data: communitymaster, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllReginalcommunitydetails = async (req, res) => {
  try {
    const communitymaster = await communityMaster.find({
      isReginal: true,
    }).populate([
      // Add any fields you want to populate here
    ]).exec();

    const count = communitymaster.length;
    return res.json({ data: communitymaster, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCommunityMessages,
  editCommunityMessages,
  deleteCommunity,
  getallcommunitydetails,
  getSpecificCommunityMaster,
  getCommunityByGroupAndTypeAndRoleAndAccess,
  // getdepartmenttypecommonwithdeptgrp
  getallcommunitydetailsbylocation,
  getallcommunitydetailsbyname,
  listCommunityMaster,
  listspeccommmaster,
  getalllocationcommunitydetails,
  getReginalcommunitydetails,
  getAllReginalcommunitydetails,
};