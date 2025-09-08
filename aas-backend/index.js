// aas-backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");

dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());

// ---------- Passport Setup ----------
require("./config/passport")(passport); // ✅ pass passport into config
app.use(passport.initialize());

// ---------- MongoDB Connection ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ---------- Routes ----------
const authRoutes = require("./route/auth"); // ✅ corrected folder name
app.use("/api/auth", authRoutes);

// ---------- Server Start ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
