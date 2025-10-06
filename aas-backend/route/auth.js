const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

// ================= NORMAL SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email/username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      tenantId: null,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully, please login" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ================= NORMAL LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name, username: user.username },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ================= GOOGLE AUTH =================
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        user = new User({
          name: req.user.name,
          username: req.user.email.split("@")[0],
          email: req.user.email,
          password: null,
          tenantId: null,
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "secretKey",
        { expiresIn: "1h" }
      );

      return res.redirect(
        `http://localhost:3000/success?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
      );
    } catch (err) {
      console.error("❌ Google callback error:", err);
      res.status(500).json({ message: "Google login/signup failed" });
    }
  }
);

// ================= TWITTER AUTH =================
router.get(
  "/twitter",
  passport.authenticate("twitter", { scope: ["tweet.read", "users.read", "offline.access"] })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        user = new User({
          name: req.user.name,
          username: req.user.email.split("@")[0],
          email: req.user.email,
          password: null,
          tenantId: null,
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "secretKey",
        { expiresIn: "1h" }
      );

      return res.redirect(
        `http://localhost:3000/success?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
      );
    } catch (err) {
      console.error("❌ Twitter callback error:", err);
      res.status(500).json({ message: "Twitter login/signup failed" });
    }
  }
);

// ================= FACEBOOK AUTH =================
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        user = new User({
          name: req.user.name,
          username: req.user.email ? req.user.email.split("@")[0] : `fb_${req.user.id}`,
          email: req.user.email || `${req.user.id}@facebook.com`,
          password: null,
          tenantId: null,
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "secretKey",
        { expiresIn: "1h" }
      );

      return res.redirect(
        `http://localhost:3000/success?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
      );
    } catch (err) {
      console.error("❌ Facebook callback error:", err);
      res.status(500).json({ message: "Facebook login/signup failed" });
    }
  }
);

// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  try {
    // If you are using sessions:
    if (req.logout) req.logout(() => {});

    // If you are using JWT (as in your case):
    // The frontend should just remove the token from localStorage or cookie.

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
});

module.exports = router;
