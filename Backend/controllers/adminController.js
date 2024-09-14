const express = require("express");
const mongoose = require("mongoose");
const AdminName = require("../models/adminschema");
const multer = require("multer");
//require("../models/imageDetails");
const storage = multer.memoryStorage(); // Store the file in memory as a buffer
//const ImageDetails = require('../models/imageDetails');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Role = require("../models/Roles");
const passport = require("passport");

const app = express();
app.use(cookieParser());

const generateToken = (id) => {
  return jwt.sign({ id }, "everything", { expiresIn: "24h" });
};

const router = express.Router();

const Adminids = async (req, res) => {
  try {
    const adminIds = await AdminName.find().select("_id");
    res.json(adminIds);
  } catch (error) {
    // console.error('Error fetching admin IDs:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Add Type
const addAdminName = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      location,
      departmentGroup,
      departmentType,
      roles,
      status,
      image,
    } = req.body;

    // Create a new admin record
    const newAdmin = new AdminName({
      name,
      email,
      password,
      location,
      departmentGroup,
      departmentType,
      roles,
      status,
      image,
    });

    // Save the new admin record to the database
    const savedAdmin = await newAdmin.save();

    // Send response indicating success
    return res.json({ success: true, data: savedAdmin });
  } catch (error) {
    // console.error('Error creating admin:', error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal Server Error",
        error: error.message,
      });
  }
};

const AddImage = async (req, res) => {
  const { base64 } = req.body;
  try {
    await image.create({ image: base64 });
    res.send({ Status: "Ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
};
const getImage = async (req, res) => {
  try {
    await image.find({}).then((data) => {
      res.send({ Status: "Ok", data: data });
    });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
};

const getAllAdminNames = async (req, res) => {
  try {
    const adminNames = await AdminName.find()
      .populate([
        { path: "departmentGroup", select: "name" },
        { path: "departmentType", select: "name" },
        { path: "location", select: "name" },
        { path: "roles", select: "role" },
      ])
      .exec();
    // const adminsWithImages = await Promise.all(adminNames.map(async (admin) => {
    //const imageDetails = await ImageDetails.findById(admin.image);
    // console.log(imageDetails);

    return res.json({ data: adminNames });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteadmin = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedadmin = await AdminName.findByIdAndDelete(id);

    if (!deletedadmin) {
      return res.status(404).json({ error: "data not found" });
    }

    return res.json({ success: true, msg: "Data Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    let {
      name,
      email,
      password,
      location,
      departmentGroup,
      departmentType,
      roles,
      status,
      image,
    } = req.body;
    //const imageDetails = new ImageDetails({ image });
    //const savedImage = await imageDetails.save();
    image = req.file.path;
    const updatedadmin = await AdminName.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        image,
        location,
        departmentGroup,
        departmentType,
        roles,
        status,
        image,
      },
      { new: true }
    );

    if (!updatedadmin) {
      // console.log("updated",updatedadmin);
      return res.status(404).json({ error: "Type not found" });
    }
    //  console.log("updated",updatedadmin);
    return res.json({ success: true, data: updatedadmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSpecificAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const specificadmindata = await AdminName.findById(id).populate([
      { path: "departmentGroup", select: "name" },
      { path: "departmentType", select: "name" },
      { path: "location", select: "name" },
      { path: "roles", select: "role" },
    ]);

    if (!specificadmindata) {
      return res.status(404).json({ error: "Emp Role not found" });
    }

    return res.json({ success: true, data: specificadmindata });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getadminbylocation = async (req, res) => {
  try {
    const id = req.params.id;
    const specificadmindata = await AdminName.findById(id).populate([
      { path: "departmentGroup", select: "name" },
      { path: "departmentType", select: "name" },
      { path: "location", select: "name" },
      { path: "roles", select: "role" },
    ]);

    if (!specificadmindata) {
      return res.status(404).json({ error: "Emp Role not found" });
    }

    return res.json({ success: true, data: specificadmindata });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdminByGroupAndType = async (req, res) => {
  try {
    const departmentGroupId = req.params.departmentGroupId;
    const departmentTypeId = req.params.departmentTypeId;

    const specadmindatabygroupandtype = await AdminName.find({
      departmentGroup: departmentGroupId,
      departmentType: departmentTypeId,
    })
      .populate([
        { path: "departmentGroup", select: "name" },
        { path: "departmentType", select: "name" },
        { path: "location", select: "name" },
        { path: "roles", select: "role" },
      ])
      .exec();

    return res.json({ data: specadmindatabygroupandtype });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(405)
      .send({ success: false, msg: "Please fill all required fields" });
  }

  // Convert email to lowercase
  const normalizedEmail = email.toLowerCase();

  // Check if it's a Google login
  if (req.body.googleToken) {
    passport.authenticate("google", { scope: ["email", "profile"] })(req, res);
    return;
  }

  const admin = await AdminName.findOne({ email: normalizedEmail });

  if (admin) {
    if (admin.status === "InActive") {
      return res
        .status(403)
        .send({ success: false, msg: "Account is InActive" });
    }

    const passwordIsCorrect = password === admin.password;
    if (passwordIsCorrect) {
      const token = generateToken(admin._id);
      const id = admin._id;
      const name = admin.name;
      const location = admin.location;

      const roles = await Role.findOne({ _id: admin.roles });

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });

      return res.send({
        success: true,
        msg: "Successfully LoggedIn",
        token,
        roles: roles.role,
        id,
        location,
        name,
      });
    } else {
      return res
        .status(407)
        .send({ success: false, msg: "Please Enter a Correct Password" });
    }
  } else {
    return res.status(401).send({ success: false, msg: "Invalid Credentials" });
  }
});

const handleGoogleLogin = async (req, res) => {
  try {
    const googleEmail = req.body.email;

    // Check if a user with this Google email exists in the database
    const admin = await AdminName.findOne({ email: googleEmail });
    const roles = await Role.findOne({ _id: admin.roles });
    if (admin) {
      // User exists, generate a JWT token
      const token = generateToken(admin._id);
      const id = admin._id;
      // const location=user.location;

      // Send the token and roles information in the response
      res.json({
        success: true,
        token,
        id: admin._id,
        roles: roles.role,
      });
      // console.log("This is the Response",res);
    } else {
      // User doesn't exist
      res.json({ success: false, message: "Not Authenticated" });
    }
  } catch (error) {
    // console.error('Error during Google login:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful Google login, redirect or respond as needed
    res.redirect("/dashboard");
  }
);

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Successfully logged out",
  });
});

//Get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.body.token;
  // console.log(token);
  if (!token) {
    return res.send({ success: false });
  }

  // Verify token
  try {
    // Verify token
    const verified = jwt.verify(token, "everything");
    if (verified) {
      return res.send({ success: true });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Token has expired
      return res.send({ success: false, message: "Token expired" });
    } else {
      // Other verification errors
      return res.send({ success: false, message: "Invalid token" });
    }
  }
});

// const updateAdmin = asyncHandler(async (req, res) => {
//   if (req.body.id) {
//     const {id, name, status } = req.body;

//     const admin = await AdminName.findById(id);
//     const reqroles=await Role.findOne({_id:admin.roles})
//     const image = req.file ? req.file.path : admin.image; // Get the path of the uploaded file

//     await AdminName.findByIdAndUpdate(id, {
//       name: name,
//       roles: reqroles.role,
//       image: image,
//       status: status,
//     });
//     return res.send({
//       success: true,
//       msg: " updated",
//     });
//   } else {
//     return res.send({
//       success: false,
//       msg: "Person not found",
//     });
//   }
// });
const updateAdmin = asyncHandler(async (req, res) => {
  try {
    if (req.body.id) {
      const { id, name, status } = req.body;
      const admin = await AdminName.findById(id);
      const image = req.file ? req.file.path : admin.image; // Get the path of the uploaded file

      const updatedAdmin = await AdminName.findByIdAndUpdate(
        id,
        {
          name: name,
          image: image,
          status: status,
        },
        { new: true }
      ); // Use { new: true } to get the updated document

      if (updatedAdmin) {
        const role = await Role.findById(updatedAdmin.roles);
        return res.send({
          success: true,
          data: {
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            image: updatedAdmin.image,
            roles: role ? role.role : null, // Assuming role has a 'role' property
            status: updatedAdmin.status,
          },
          msg: "Updated successfully",
        });
      } else {
        return res.send({
          success: false,
          msg: "Person not found",
        });
      }
    } else {
      return res.send({
        success: false,
        msg: "Invalid request",
      });
    }
  } catch (error) {
    // console.error("Error during update:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

const getLoggedInAdmin = asyncHandler(async (req, res) => {
  let AdminID = req.body.id;
  // console.log("The ID is",AdminID);
  const admin = await AdminName.findById(AdminID);

  if (admin) {
    const { _id, name, email, image, password, roles, status } = admin;
    const reqrole = await Role.findOne({ _id: admin.roles });
    return res.send({
      success: true,
      _id,
      name,
      email,
      image,
      password,
      roles: reqrole.role,
      status,
    });
  } else {
    return res.send({ success: false, msg: "Person not found" });
  }
});

const getSpecificAdminwithroles = asyncHandler(async (req, res) => {
  try {
    let adminID = req.body.id;
    // console.log(adminID);
    const admin = await AdminName.findById(adminID);
    if (admin) {
      const { _id, name, email, image, roles, status } = admin;
      const reqroles = await Role.findOne({ _id: admin.roles });
      return res.send({
        success: true,
        _id,
        name,
        email,
        image,
        roles: reqroles.role,
        status,
      });
    } else {
      return res.send({ success: false, msg: "Person not found" });
    }
  } catch (error) {
    // Handle any errors that might occur during the execution of the function
    return res.send({ success: false, error: error.message });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const admin = await AdminName.findById(req.body.id);
  const { oldPassword, newPassword, id } = req.body;

  if (!admin) {
    return res.send({
      success: false,
      msg: "Person not found, please sign up",
    });
  }

  // Validate
  if (!oldPassword || !newPassword) {
    return res.send({ success: false, msg: "Please add old and new password" });
  }

  // Compare plain text passwords
  if (oldPassword !== admin.password) {
    return res.send({ success: false, msg: "Old password is incorrect" });
  }

  if (oldPassword === newPassword) {
    return res.send({
      success: false,
      msg: "New Password cannot be the same as the Old password",
    });
  } else {
    // Update password as plain text
    await AdminName.findByIdAndUpdate(id, {
      password: newPassword,
    });

    return res.send({ success: true, msg: "Password changed successfully" });
  }
});

// Forgot <Password></Password>
const forgotPassword = asyncHandler(async (req, res) => {
  let { email } = req.body;
  const admin = await AdminName.findOne({ email });
  if (!admin) {
    return res.send({ success: false, msg: "Person does not exist" });
  }
  // Delete Token if it exist in DB
  await Token.findOneAndDelete({ adminId: admin.id });

  // Create Rest Token
  let resetToken = crypto.randomBytes(32).toString("hex") + admin._id;
  // console.log(resetToken);

  // Hash token before saving to db
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // /Save token to DB
  await new Token({
    adminId: admin.id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //30 Minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

  // Reset Email
  const message = `
  <html>
      <head>
        <title>Reset Password</title>
      </head>
      <body>
        <h2>Hello ${admin.name},</h2>
        <p>We received a request to reset your password</p>
        <p>Your Password is <b>${admin.password}</b></p>
        <p>Thanks & Regards,</p>
        <p>Barodaweb</p>
      </body>
    </html> `;

  const subject = "OPA|Admin|Password";
  const send_to = admin.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    return res.send({ success: true, msg: "Reset Email Sent" });
  } catch (error) {
    return res.send(error);
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find Token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.send("Invalid or Expired Token");
  }

  // Find User
  const admin = await AdminName.findOne({ _id: userToken.adminId });
  admin.password = password;
  admin.save();

  return res.send({
    success: true,
    msg: "Password Reset Successful, Please Login",
  });
});

// Get User
const getAdmins = async (req, res) => {
  try {
    const admin = await AdminName.find()
      .populate([
        { path: "roles", select: "role" },
        { path: "location", select: "name" },
        { path: "departmentGroup", select: "name" },
        { path: "departmentType", select: "name departmentGroup" },
        // {path:'employeeRole',select:'EmployeeRole departmentGroup departmentType'},
      ])
      .exec();
    const adminCount = admin.length;
    return res.json({ success: true, adminCount, data: admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  //   const admin = await AdminName.find().exec();
  //   if (admin) {
  //     return res.json({ data:admin });

  //   } else {
  //     return res.send({ success: false, msg: "Person not found" });
  //   }
  // }
  // ;
};

// Delete User

const DeleteAdmin = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const admin = await AdminName.findByIdAndRemove(id);
  if (admin) {
    return res.send({ success: true, msg: "Person Deleted Successfully" });
  } else {
    return res.send({ success: false, msg: "Person not found" });
  }
});
const isAdminWithEmailExists = async (req, res) => {
  try {
    const email = req.body.email;

    // Check if a user with this email exists in the database
    const admin = await AdminName.findOne({ email });

    if (admin) {
      // User exists
      res.json({ success: true, exists: true, roles: admin.roles });
    } else {
      // User doesn't exist
      res.json({ success: true, exists: false });
    }
  } catch (error) {
    // console.error('Error checking  existence:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const listAdminNames = async (req, res) => {
  try {
    const { page, per_page, sorton, sortdir, match } = req.body;

    let query = [];

    // Handle match parameter
    if (match) {
      query.push({
        $match: {
          $or: [
            { name: { $regex: match, $options: 'i' } },
            { email: { $regex: match, $options: 'i' } },
            // Add more fields for search as needed
          ],
        },
      });
    }

    // Optionally sort documents
    let sort = {};
    if (sorton && sortdir) {
      sort[sorton] = sortdir === 'desc' ? -1 : 1;
    } else {
      sort = { createdAt: -1 }; // Sort by creation date by default, adjust based on your needs
    }
    query.push({ $sort: sort });

    // Optionally skip and limit documents for pagination
    let skip = 0;
    if (page !== undefined && per_page !== undefined) {
      skip = (page - 1) * per_page;
      query.push({ $skip: skip });
      query.push({ $limit: per_page });
    }

    const adminNamesList = await AdminName.aggregate(query)

      .exec(); // Add .exec() to execute the aggregation
    const populatedAdminNamesList = await AdminName.populate(adminNamesList, [
      { path: 'location', select: 'name' },
      { path: 'departmentGroup', select: 'name' },
      { path: 'departmentType', select: 'name' },

    ]);
    console.log('Query result:', populatedAdminNamesList);
    res.json(populatedAdminNamesList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

module.exports = {
  Adminids,
  addAdminName,
  getAllAdminNames,
  editAdmin,
  getSpecificAdmin,
  getAdminByGroupAndType,
  deleteadmin,
  AddImage,
  getImage,
  loginAdmin,
  handleGoogleLogin,
  logout,
  loginStatus,
  updateAdmin,
  getLoggedInAdmin,
  getSpecificAdminwithroles,
  updatePassword,
  resetPassword,
  getAdmins,
  forgotPassword,
  isAdminWithEmailExists,
  DeleteAdmin,
  getadminbylocation,
  listAdminNames,
};
