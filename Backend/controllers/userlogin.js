const express = require("express");
const mongoose = require("mongoose");
const username = require("../models/rolesResponsibilities");
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
const passport = require("passport");
const empnames = require("../models/EmployeeName");
const { log } = require("console");

const app = express();
app.use(cookieParser());

const generateToken = (id) => {
  return jwt.sign({ id }, "everything", { expiresIn: "24h" });
};
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ success: false, msg: "Please fill all required fields" });
  }

  // Check if it's a Google login
  if (req.body.googleToken) {
    passport.authenticate("google", { scope: ["email", "profile"] })(req, res);
    return;
  }
  const empUser = await empnames.findOne({ email });
  console.log("email", email);

  if (!empUser) {
    return res.send({ success: false, msg: "Account not found" });
  }

  const user = await username.findOne({ email });
  console.log("email", email);

  if (!user) {
    return res.send({ success: false, msg: "Account not found" });
  }

  // Compare passwords as plain text
  // const name=await adminname.findById(user.)
  const passwordIsCorrect = password === user.password;
  console.log("password", password);
  const id = user._id;
  console.log("id", id);
  const token = generateToken(user._id);
  const rolenames = await empnames.findById(user.employeeName);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    return res.send({
      success: true,
      msg: "Successfully LoggedIn",
      token,
      _id: user._id,
      locationSchema: user.locationSchema,
      departmentGroup: user.departmentGroup,
      departmentType: user.departmentType,
      employeeRole: user.employeeRole,
      employeeName: user.employeeName,
      isActive: user.isActive,
      Dashboard: user.Dashboard,
      MenuMaster: user.MenuMaster,
      Roles: user.Roles,
      AdminUser: user.AdminUser,
      CommunityUpdateMaster: user.CommunityUpdateMaster,
      LocationMaster: user.LocationMaster,
      DepartmentGroup: user.DepartmentGroup,
      DepartmentType: user.DepartmentType,
      EmployeeRole: user.EmployeeRole,
      Employeemaster: user.Employeemaster,
      AddTask: user.AddTask,
      AssignMaster: user.AssignMaster,
      CMS: user.CMS,
      name: rolenames.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    });
  } else {
    return res.status(401).send({ success: false, msg: "Invalid Credentials" });
  }
});

const handleUserGoogleLogin = async (req, res) => {
  try {
    const googleEmail = req.body.email;

    // Check if a user with this Google email exists in the database
    const user = await username.findOne({ email: googleEmail });
    const rolenames = await empnames.findById(user.employeeName);

    if (user) {
      // User exists, generate a JWT token

      const token = generateToken(user._id);
      const id = user._id;
      res.send({
        success: true,
        token,
        success: true,
        msg: "Successfully LoggedIn",
        _id: user._id,
        locationSchema: user.locationSchema,
        departmentGroup: user.departmentGroup,
        departmentType: user.departmentType,
        employeeRole: user.employeeRole,
        employeeName: user.employeeName,
        isActive: user.isActive,
        Dashboard: user.Dashboard,
        MenuMaster: user.MenuMaster,
        Roles: user.Roles,
        AdminUser: user.AdminUser,
        CommunityUpdateMaster: user.CommunityUpdateMaster,
        LocationMaster: user.LocationMaster,
        DepartmentGroup: user.DepartmentGroup,
        DepartmentType: user.DepartmentType,
        EmployeeRole: user.EmployeeRole,
        Employeemaster: user.Employeemaster,
        AddTask: user.AddTask,
        AssignMaster: user.AssignMaster,
        CMS: user.CMS,
        name: rolenames.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: user.__v,
      });
    } else {
      res.json({ success: false, message: "Not Authenticated" });
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/authentication" }),
//   (req, res) => {
//     // Successful Google login, redirect or respond as needed
//     res.redirect("/dashboard");
//   }
// );
app.get('/user/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful Google login, redirect or respond as needed
    res.redirect('/dashboard');
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

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.body.token;
  console.log(token);
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

// const updateUser= asyncHandler(async (req, res) => {
//   try {
//     if (req.body.id) {
//       const { id} = req.body;

//       const admin = await username.findById(id);
//       // const name=await empnames.findById(admin.)
//       // const image = req.file ? req.file.path : admin.image; // Get the path of the uploaded file

//       const updatedAdmin = await AdminName.findByIdAndUpdate(id, {
//         name: name,
//       }, { new: true }); // Use { new: true } to get the updated document

//       if (updatedAdmin) {
//         const role = await Role.findById(updatedAdmin.roles);
//         return res.send({
//           success: true,
//           data: {
//             _id: updatedAdmin._id,
//             name: updatedAdmin.name,
//           },
//           msg: "Updated successfully",
//         });
//       } else {
//         return res.send({
//           success: false,
//           msg: "Person not found",
//         });
//       }
//     } else {
//       return res.send({
//         success: false,
//         msg: "Invalid request",
//       });
//     }
//   } catch (error) {
//     console.error("Error during update:", error);
//     return res.status(500).json({ success: false, msg: "Internal Server Error" });
//   }
// });

const upload = multer({ dest: 'uploads/' }); // Configure multer for file storage

// Assuming you have a middleware to handle multipart/form-data
// and you've set it up in your route as upload.single('profileImage')

const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await username.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const empId = user.employeeName;
    const empname = await empnames.findById(empId);

    if (!empname) {
      return res.status(404).json({
        success: false,
        msg: "Employee name not found",
      });
    }

    // Update user information if provided in the body
    if (req.body.name) {
      empname.name = req.body.name;
    }

    // Update profile image if file is provided
    if (req.file) {
      const imagePath = req.file.path; // Assuming you want to store the file path in the database
      empname.profileImage = imagePath; // Update profile image in employeeName schema
    }

    await empname.save();

    return res.status(200).json({
      success: true,
      data: {
        _id: empname.id,
        name: empname.name,
        profileImage: empname.profileImage, // Send back the updated image URL
      },
      msg: "Updated successfully",
    });

  } catch (error) {
    console.error("Error during update:", error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});


// const updateUser = asyncHandler(async (req, res) => {
//   try {
//     if (req.body.password) {
//       const { id, password } = req.body;

//       // Find the user in the database
//       const user = await username.findById(req.params.id);

//       if (!user) {
//         return res.send({
//           success: false,
//           msg: "User not found",
//         });
//       }

//       // Update the password field in the user document
//       user.password = password;
//       await user.save();

//       return res.send({
//         success: true,
//         msg: "Password updated successfully",
//       });
//     } else {
//       return res.send({
//         success: false,
//         msg: "Invalid request",
//       });
//     }
//   } catch (error) {
//     console.error("Error during password update:", error);
//     return res.status(500).json({ success: false, msg: "Internal Server Error" });
//   }
// });
// const updateUser = asyncHandler(async (req, res) => {
//   try {
//     if (req.body.id) {
//       const { id} = req.body;
//       const user = await username.findById(id);
//       // const image = req.file ? req.file.path : admin.image; // Get the path of the uploaded file

//       const updatedAdmin = await username.findByIdAndUpdate(id, {
//       }, { new: true }); // Use { new: true } to get the updated document

//       if (updatedAdmin) {
//         // const role = await Role.findById(updatedAdmin.roles);
//         return res.send({
//           success: true,
//           data: {
//             _id: updatedAdmin._id,
//             email:updatedAdmin.email
//             // name: updatedAdmin.name,
//             // image: updatedAdmin.image,
//             // roles: role ? role.role : null, // Assuming role has a 'role' property
//             // status: updatedAdmin.status,
//           },
//           msg: "Updated successfully",
//         });
//       } else {
//         return res.send({
//           success: false,
//           msg: "Person not found",
//         });
//       }
//     } else {
//       return res.send({
//         success: false,
//         msg: "Invalid request",
//       });
//     }
//   } catch (error) {
//     console.error("Error during update:", error);
//     return res.status(500).json({ success: false, msg: "Internal Server Error" });
//   }
// });

const getLoggedInUser = asyncHandler(async (req, res) => {
  let UserID = req.body.id;
  console.log("User id", UserID);
  const user = await username.findById(UserID).populate('departmentType').populate('locationSchema').populate('departmentGroup').populate('employeeRole').populate('employeeName')
  // const names=await empnames.findById(user.employeeName);
  console.log("user, ", user);
  if (user) {
    const {
      _id,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive,
      Dashboard,
      MenuMaster,
      Roles,
      AdminUser,
      CommunityUpdateMaster,
      LocationMaster,
      DepartmentGroup,
      DepartmentType,
      EmployeeRole,
      Employeemaster,
      AddTask,
      AssignMaster,
      CMS,
      name,
      email,
      password,
    } = user;
    // const reqrole = await Role.findOne({ _id: admin.roles });
    const rolenames = await empnames.findById(user.employeeName);
    return res.send({
      success: true,
      _id,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive,
      Dashboard,
      MenuMaster,
      Roles,
      AdminUser,

      CommunityUpdateMaster,
      LocationMaster,
      DepartmentGroup,
      DepartmentType,
      EmployeeRole,
      Employeemaster,
      AddTask,
      AssignMaster,
      CMS,
      email,

      password,
      name: rolenames.name,
    });
  } else {
    return res.send({ success: false, msg: "Person not found" });
  }
});

const getSpecificUser = asyncHandler(async (req, res) => {
  try {
    let userID = req.body.id;
    console.log(userID);
    const user = await username.findById(userID);
    if (user) {
      const { _id, email, name,profileImage } = user;
      // const reqroles=await Role.findOne({_id:admin.roles});
      const newname = await empnames.findById(user.employeeName);
      return res.send({
        success: true,
        _id,
        name: newname.name,
        email,
        profileImage:newname.profileImage,
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
  const user = await username.findById(req.body.id);
  const { oldPassword, newPassword, id } = req.body;

  if (!user) {
    return res.send({ success: false, msg: "Person not found, please sign up" });
  }

  // Validate
  if (!oldPassword || !newPassword) {
    return res.send({ success: false, msg: "Please add old and new password" });
  }

  // Compare plain text passwords
  if (oldPassword !== user.password) {
    return res.send({ success: false, msg: "Old password is incorrect" });
  }

  if (oldPassword === newPassword) {
    return res.send({
      success: false,
      msg: "New Password cannot be the same as the Old password",
    });
  } else {
    // Update password as plain text
    await username.findByIdAndUpdate(id, {
      password: newPassword,
    });

    return res.send({ success: true, msg: "Password changed successfully" });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  let { email } = req.body;
  const user = await username.findOne({ email });
  if (!user) {
    return res.send({ success: false, msg: "Person does not exist" });
  }
  // Delete Token if it exist in DB
  await Token.findOneAndDelete({ userID: user.id });
  const empname = await empnames.findById(user.employeeName);
  const finalname = empname.name

  // Create Rest Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token before saving to db
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // /Save token to DB
  await new Token({
    userID: user.id,
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
        <h2>Hello ${finalname},</h2>
        <p>We received a request to reset your password:</p>
        <p>Your Password is <b>${user.password}</b></p>
        <p>Thanks & Regards,</p>
        <p>Barodaweb</p>
      </body>
    </html>
  `;
  const subject = "OPA|USER|PASSWORD";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    return res.send({ success: true, msg: "Reset Email Sent" });
  } catch (error) {
    return res.send(error);
  }
});

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
  const user = await AdminName.findOne({ _id: userToken.userID });
  user.password = password;
  user.save();

  return res.send({
    success: true,
    msg: "Password Reset Successful, Please Login",
  });
});


const getUsers = asyncHandler(async (req, res) => {
  const user = await empnames.find().exec();
  if (user) {
    return res.send({ user });
  } else {
    return res.send({ success: false, msg: "Person not found" });
  }
});


const DeleteUser = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const user = await username.findByIdAndRemove(id);
  if (user) {
    return res.send({ success: true, msg: "Person Deleted Successfully" });
  } else {
    return res.send({ success: false, msg: "Person not found" });
  }
});

const isUserWithEmailExists = async (req, res) => {
  try {
    const email = req.body.email;

    // Check if a user with this email exists in the database
    const user = await username.findOne({ email });

    if (user) {
      // User exists
      res.json({ success: true, exists: true, roles: "User" });
    } else {
      // User doesn't exist
      res.json({ success: true, exists: false });
    }
  } catch (error) {
    console.error('Error checking  existence:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {
  handleUserGoogleLogin,
  loginUser,
  logout,
  loginStatus,
  updateUser,
  getLoggedInUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  DeleteUser,
  isUserWithEmailExists,
  getSpecificUser

};
