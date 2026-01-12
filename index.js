const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;







// ======================
// MIDDLEWARE
// ======================
app.use(express.json());




// ======================
// ROUTES
// ======================
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const profileRoutes = require("./routes/profile");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", profileRoutes);




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

  app.use("/uploads", express.static(path.join(__dirname, "uploads")));