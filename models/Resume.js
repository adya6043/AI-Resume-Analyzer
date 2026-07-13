const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  fileName: {
    type: String,
  },

  score: {
    type: Number,
  },

  atsScore: {
    type: Number,
  },

  extractedSkills: {
    type: Object,
  },

  strengths: {
    type: Array,
  },

  missingSkills: {
    type: Array,
  },

  feedback: {
    type: Array,
  },

  questions: {
    type: Array,
  },

  matchedSkills: {
    type: Array,
  },

  missingATSskills: {
    type: Array,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model("Resume", resumeSchema);