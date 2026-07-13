const authMiddleware = require("../middleware/authMiddleware");
console.log("Upload Routes Loaded ✅");

const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getResumeHistory
} = require("../controllers/uploadController");

const Resume = require("../models/Resume");

// Upload Resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// Resume History
router.get(
  "/history",
  authMiddleware,
  getResumeHistory
);

// Test Route
router.get("/check", (req, res) => {
  res.send("Route working ✅");
});

// Delete Resume
router.delete(
  "/history/:id",
  authMiddleware,
  async (req, res) => {
    try {

      await Resume.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Resume deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

module.exports = router;

console.log(
  "UPLOAD ROUTES FILE RUNNING ✅"
);