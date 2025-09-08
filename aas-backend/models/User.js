// aas-backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },

  password: { type: String, required: true }, // hashed password

  tenantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Tenant", 
    default: null 
  },

  role: { 
    type: String, 
    enum: ["admin", "manager", "operator"], 
    default: "operator" 
  },

  createdAt: { type: Date, default: Date.now }
});

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
