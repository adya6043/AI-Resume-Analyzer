const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express(); //

app.use(cors());
app.use(express.json());


const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api", uploadRoutes);
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const answerRoutes = require("./routes/answerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/answers", answerRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("SERVER FILE RUNNING ✅");
});