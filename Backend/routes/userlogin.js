const express = require("express");
const {handleUserGoogleLogin,loginUser,logout,loginStatus,updateUser,getLoggedInUser,updatePassword,forgotPassword,resetPassword,getUsers,DeleteUser,isUserWithEmailExists,getSpecificUser} = require("../controllers/userlogin");
const upload = require("../middlewares/multerMiddleware");
const user=require("../models/rolesResponsibilities");
const path = require("path");
const protect = require("../middlewares/authMiddleware");
const cookieParser = require("cookie-parser");

// const adminIdsRouter = require('../routes/adminRoutes'); 


const router = express.Router();
router.post("/authentication" , loginUser);
router.post("/logout" , logout);
router.post("/loggedinstatus" , loginStatus);
router.post("/google-login-authentication",handleUserGoogleLogin);



// Apply multer middleware for file upload on the specific route
router.put("/updateuser/:id", upload.single('profileImage'), updateUser);
router.post("/getloggedinuser",protect,getLoggedInUser);
router.put("/updatepassword", protect ,updatePassword);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword/:resetToken",resetPassword);
router.get("/getusers",getUsers);
router.delete("/deleteuser",DeleteUser);
router.post("/doesuserexist",isUserWithEmailExists);
router.post("/getspecificuser",getSpecificUser);

module.exports = router;