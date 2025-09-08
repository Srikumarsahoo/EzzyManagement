const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

// ========== NORMAL SIGNUP ==========
router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email/username already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      tenantId: null,
    });

    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully, please login" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ========== NORMAL LOGIN ==========
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ========== GOOGLE AUTH ROUTES ==========

// 1) Start Google login/signup
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2) Google OAuth callback
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
        `http://localhost:3000/success?token=${token}&name=${encodeURIComponent(
          user.name
        )}&email=${encodeURIComponent(user.email)}`
      );
    } catch (err) {
      console.error("❌ Google callback error:", err);
      res.status(500).json({ message: "Google login/signup failed" });
    }
  }
);

// ========== TWITTER AUTH ROUTES (OAuth 2.0) ==========

// 1) Start Twitter login/signup
router.get(
  "/twitter",
  passport.authenticate("twitter", { scope: ["tweet.read", "users.read", "offline.access"] })
);

// 2) Twitter OAuth callback
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.email });

      if (!user) {
        user = new User({
          name: req.user.name,
          username: req.user.username,
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
        `http://localhost:3000/success?token=${token}&name=${encodeURIComponent(
          user.name
        )}&email=${encodeURIComponent(user.email)}`
      );
    } catch (err) {
      console.error("❌ Twitter callback error:", err);
      res.status(500).json({ message: "Twitter login/signup failed" });
    }
  }
);

module.exports = router;
