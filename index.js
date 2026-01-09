const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ======================
// ROUTES
// ======================
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const auth = require("./middleware/auth");

app.get("/api/profile", auth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ======================
// CONNECT DB + START SERVER
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });