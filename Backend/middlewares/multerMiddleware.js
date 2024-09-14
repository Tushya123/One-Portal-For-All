const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if (file.fieldname === "profilePhoto") {
      cb(null, "./uploads");
    // }
    // cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"||
    file.mimetype === "image/jpg"||
    file.mimetype === "image/png" ||
    file.mimetype === "application/docx"||  
    file.mimetype === "application/pptx"|| 
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation" 

    
  ) {
    cb(null, true);
  } else {
    cb(null, false); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
