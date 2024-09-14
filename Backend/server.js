const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db");

const roleRoutes = require("./routes/roleRoute");
const adminRoutes = require("./routes/adminRoutes");
const userlogin = require("./routes/userlogin");
const locationRoutes = require("./routes/LocationMaster");
const PinnedItemRoute = require("./routes/Pin");
const RolesResponsibilitiesRoutes = require("./routes/RolesResponsibilities");
const Template = require("./routes/Template")
const TaskTemplate = require("./routes/TaskTemplate")
const DepartmentGroupRoutes = require("./routes/DepartmentGroupMaster");
const DepartmentTypeRoutes = require("./routes/DepartmentType");
const EmployeeRolesRoutes = require("./routes/EmployeeRoleRoutes");
const EmployeeNamesRoutes = require("./routes/EmployeeNameRoutes");
const AddTaskRoutes = require("./routes/AddTaskMaster");
const MenuMasterRoutes = require("./routes/MenuMaster");
const communityMaster = require("./routes/communitymaster");
const AssignTaskRoutes = require("./routes/AssignTask")
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const protect = require("./middlewares/authMiddleware");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require('axios');
const session = require('express-session');
const passport = require('passport');
const Admin = require('./models/adminschema');
const User = require('./models/rolesResponsibilities');
// const path = require("path");
// const { addMenuMaster } = require("./controllers/MenuMasterController");
const Oauth2strategy = require("passport-google-oauth2").Strategy

const app = express();
const port = process.env.PORT || 5002;
// const clientId = "388394949304-bmlvpqdssje2dl6kt72g02tcp6da9u3v.apps.googleusercontent.com"
// const clientSecret = "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google auth changes "
// const redirectUri = `${process.env.REACT_APP_BASE_URL}/auth/google/callback`;

// const clientIdUser = "388394949304-bmlvpqdssje2dl6kt72g02tcp6da9u3v.apps.googleusercontent.com"
// const clientSecretUser = "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"
// const redirectUriUser = `${process.env.REACT_APP_BASE_URL}/user/google/callback`;



app.use(session({
  secret: "youarebitch",
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());

// Configure Google OAuth strategy
// passport.use(
//   new Oauth2strategy({
//     clientID: clientIdUser,
//     clientSecret: clientSecretUser,
//     callbackURL: redirectUriUser,
//   },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Find or create user in your database based on Google profile
//         const user = await User.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           // Create a new user if not found
//           const newUser = new User({
//             email: profile.emails[0].value,
//             // Add other necessary fields
//           });

//           await newUser.save();
//           return done(null, newUser);
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     })
// );
// passport.use(
//   new Oauth2strategy({
//     clientID: clientId,
//     clientSecret: clientSecret,
//     callbackURL: redirectUri,
//   },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Find or create user in your database based on Google profile
//         const admin = await Admin.findOne({ email: profile.emails[0].value });

//         if (!admin) {
//           // Create a new user if not found
//           const newAdmin = new Admin({
//             email: profile.emails[0].value,
//             // Add other necessary fields
//           });

//           await newAdmin.save();
//           return done(null, newAdmin);
//         }

//         return done(null, admin);
//       } catch (error) {
//         return done(error, null);
//       }
//     })
// );

// // Serialize user into the session
// passport.serializeUser((admin, done) => {
//   done(null, admin.id);
// });
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user from the session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const admin = await Admin.findById(id);
//     done(null, admin);
//   } catch (error) {
//     done(error, null);
//   }
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });


// MIDDLEWARES
connectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);




// ----------------------------------Define a custom morgan format ----------------------------------------
morgan.token("color-status", (req, res) => {
  const status = res.statusCode;
  let color;
  if (status >= 500) {
    color = "\x1b[31m";
  } else if (status >= 400) {
    color = "\x1b[33m";
  } else if (status >= 300) {
    color = "\x1b[36m";
  } else {
    color = "\x1b[32m";
  }
  return color + status + "\x1b[0m";
});

const customFormat = ":method :url :color-status :response-time ms";


app.use(morgan(customFormat));


app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("./uploads"));



// Routes Middleware


app.use("/auth", adminRoutes);
app.use("/user", userlogin)
app.use("/location", locationRoutes);

app.use("/rolesresponsibilities", RolesResponsibilitiesRoutes);
app.use("/template", Template);
app.use("/tasktemplate", TaskTemplate);
app.use("/departmentgroup", DepartmentGroupRoutes);
app.use("/pin", PinnedItemRoute);
app.use("/departmenttype", DepartmentTypeRoutes);
app.use("/employeerole", EmployeeRolesRoutes);
app.use("/employeename", EmployeeNamesRoutes);
app.use("/addtask", AddTaskRoutes);
app.use("/menu", MenuMasterRoutes);
app.use("/assigntask", AssignTaskRoutes);
app.use("/communitymaster", communityMaster);
app.use("/roles", roleRoutes);

// ROUTES
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.listen(port, () => {
  console.log("Server Started on", port);
});
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {

    res.redirect('https://opaadmin.barodaweb.org/dashboard');
  });
app.get('/user/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {

    res.redirect('https://opauser.barodaweb.org/dashboard');
  });
