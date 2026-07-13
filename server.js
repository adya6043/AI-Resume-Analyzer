const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express(); // ✅ yeh pehle aayega

app.use(cors());
app.use(express.json());

// ✅ routes yahan use honge
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api", uploadRoutes);
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("SERVER FILE RUNNING ✅");
});