const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const Evaluation = require("../models/Evaluation");


// Get History
router.get("/", authMiddleware, async (req, res) => {

  try {

    const resumes = await Resume.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(resumes);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});
// Get Evaluation History
router.get("/evaluations", authMiddleware, async (req, res) => {
  try {
    const evaluations = await Evaluation.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(evaluations);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Delete Resume

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;