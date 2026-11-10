const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("===== AUTH MIDDLEWARE =====");
  console.log("Authorization header exists:", !!authHeader);
  console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

  if (!authHeader) {
    console.log("❌ No Authorization header");

    return res.status(401).json({
      message: "No token",
    });
  }

  // Bearer token extract
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  console.log("Token received:", !!token);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("✅ JWT verified successfully");
    console.log("User ID:", decoded.id);

    req.user = decoded;

    next();

  } catch (error) {
    console.error("❌ JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};