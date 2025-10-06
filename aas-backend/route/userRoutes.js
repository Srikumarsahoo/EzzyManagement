const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ Get user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update user profile
router.put("/:id", async (req, res) => {
  try {
    const { name, email, username, mobile, company, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, username, mobile, company, image },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
