const multer = require("multer");

// Storage configuration
const storage = multer.diskStorage({//it decide where file will be saved 
  destination: function (req, file, cb) { // destination:file  save in upload folder 
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {//avoid clash by unique name 
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
//I used Multer as middleware to intercept multipart/form-data requests and handle file storage