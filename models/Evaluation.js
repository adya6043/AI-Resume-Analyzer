const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    userAnswer: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    result: {
      type: String,
      required: true,
    },

    feedback: {
      type: String,
      required: true,
    },

    improvement: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);