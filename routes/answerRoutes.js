const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { evaluateAnswer } = require("../controllers/answerController");

router.post("/evaluate", authMiddleware, evaluateAnswer);

module.exports = router;