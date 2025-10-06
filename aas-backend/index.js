// ---------- aas-backend/index.js ----------
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");

dotenv.config();
const app = express();

// ---------- Middleware ----------
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",               // Local React app
  "https://ezzy-management.vercel.app",  // Deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow Authorization headers
  })
);

// ---------- Passport Setup ----------
require("./config/passport")(passport);
app.use(passport.initialize());

// ---------- MongoDB Connection ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// ---------- Routes ----------
const authRoutes = require("./route/auth");
app.use("/api/auth", authRoutes);

// ✅ Add user routes (Profile get/update)
const userRoutes = require("./route/userRoutes");
app.use("/api/users", userRoutes);

// ---------- Health Check ----------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// ---------- Server Start ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
