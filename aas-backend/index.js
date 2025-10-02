// aas-backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");

dotenv.config();

const app = express();

// ---------- Middleware (CORS) ----------
const allowedOrigins = [
  "http://localhost:3000",               // local React app
  "https://ezzy-management.vercel.app",  // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies / authorization headers
  })
);

app.use(express.json());

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
  .catch((err) => console.error("❌ MongoDB error:", err));

// ---------- Routes ----------
const authRoutes = require("./route/auth"); 
app.use("/api/auth", authRoutes);

// ---------- Health Check ----------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// ---------- Server Start ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
