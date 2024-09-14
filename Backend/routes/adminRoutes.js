const express = require("express");
const {Adminids,getAllAdminNames,getSpecificAdmin,editAdmin,adminIdsRouter,deleteadmin,AddImage,getImage,loginAdmin,handleGoogleLogin,logout,loginStatus, updateAdmin,getLoggedInAdmin,getSpecificAdminwithroles,updatePassword,forgotPassword,resetPassword,getAdmins,DeleteAdmin, isAdminWithEmailExists,getadminbylocation, listAdminNames} = require("../controllers/adminController");
const upload = require("../middlewares/multerMiddleware");
const admin=require("../models/adminschema");
const path = require("path");
const protect = require("../middlewares/authMiddleware");
const cookieParser = require("cookie-parser");
// const adminIdsRouter = require('../routes/adminRoutes'); 
// const adminNames=require('../models/adminschema');
const AdminName = require("../models/adminschema");


const router = express.Router();
// router.use("/uploads", express.static(path.join(__dirname, "../uploads")));
router.get('/ids', Adminids);

// Your route definition
// router.post("/addadminname", upload.single('image'), async (req, res) => {
//   console.log("image path is", req.file.path);
//   // Handle the file path as needed
//   const id=req.params.id;
//   res.send('File uploaded successfully');
//   const {name,email,password,departmentGroup,departmentType,location,Role,status } = req.body;
//       console.log("data received",req.body);
//       const uploadImagePath = req.file.path;
//       console.log("image file path",uploadImagePath);
//      // console.log(uploadimage);
//      await admin.create({
//         name:name,
//         email:email,
//         password:password,
//         location:location,
//         departmentGroup:departmentGroup,
//         departmentType:departmentType,
//         roles:Role,
//         status:status,
//         image: uploadImagePath,
//       })
      
// });
router.post("/addadminname", upload.single('image'), async (req, res) => {
  try {
    console.log("image path is", req.file.path);
    // Handle the file path as needed
    const id = req.params.id;
    const { name, email, password, departmentGroup, departmentType, location, Role, status } = req.body;
    console.log("data received", req.body);
    const uploadImagePath = req.file.path;
    console.log("image file path", uploadImagePath);

    const newAdmin = await admin.create({
      name: name,
      email: email,
      password: password,
      location: location,
      departmentGroup: departmentGroup,
      departmentType: departmentType,
      roles: Role,
      status: status,
      image: uploadImagePath,
    });

    res.json({
      message: 'File uploaded successfully',
      adminData: newAdmin, // Include the newly created admin data in the response
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//router.post('/addimage',AddImage);
//router.get('/getimage',getImage);



// Routes
//router.post("/adddadminname", addAdminName);
//router.post("/uploads", upload.single('image'), addAdminName);
router.get("/getadminnames" , getAllAdminNames);
router.get("/getadminbyid/:id",getSpecificAdmin);

router.get("/getadminforlocation/:id",getadminbylocation);
router.put("/editadmin/:id",upload.single('image'), async (req, res) => {
  const  id  = req.params.id;
 try {
      
      let { name,email,password,location,departmentGroup, departmentType ,roles, status} = await req.body;
    // imagep=req.file.path;
    // image=imagep;
    // const updatedadmin=await admin.findByIdAndUpdate(
    //     id,
    //     {name,email,password,location,departmentGroup, departmentType ,roles, status,image },
    //     { new: true }
    //   );
  
    //    return res.json({success:true, data : updatedadmin});
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
    let image = req.file ? req.file.path : ''; // Check if new image uploaded, else use empty string
    if (!image) {
      // No new image uploaded, fetch the existing image path from the database
      const adminmessage = await AdminName.findById(id);
      if (adminmessage) {
        image= adminmessage.image; // Use the stored image path
      }
    }
    const updatedcommunitymaster=await AdminName.findByIdAndUpdate(id,{
      name:name,
      email:email,
    password:password,
location:location,
departmentGroup:departmentGroup,
departmentType:departmentType,
roles:roles,
  status:status,
    image:image,

    },{ new: true })
    res.json({ success: true, data: updatedcommunitymaster });
  }
  catch (error) {
    console.error("Error updating community message:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
router.post("/deleteadmin/:id",deleteadmin);
router.post("/authentication" , loginAdmin);
router.post("/google-login-authentication",handleGoogleLogin);
router.post("/logout-admin" , logout);
router.post("/loggedinstatus", loginStatus);
router.put("/updateadmin" , upload.single('image') ,updateAdmin);
router.post("/getloggedinadmin",protect,getLoggedInAdmin);
router.post("/getspecificadminwithroles",getSpecificAdminwithroles);
router.put("/updatepassword", protect ,updatePassword);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword/:resetToken",resetPassword);
router.get("/getadmins",getAdmins);
router.delete("/deleteadmin",DeleteAdmin);
router.post("/doesadminexist",isAdminWithEmailExists);

router.post('/listadmin',listAdminNames)

module.exports = router;