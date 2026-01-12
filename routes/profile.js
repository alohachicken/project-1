const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET my profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE my profile
router.put("/", auth, async (req, res) => {
  try {
    const { name, location, avatarUrl } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, location, avatarUrl },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;