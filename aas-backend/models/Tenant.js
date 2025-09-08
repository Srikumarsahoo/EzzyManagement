// aas-backend/models/Tenant.js
const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pid: { type: String, required: true, unique: true }, // Manufacturer PID (provided on signup)
  metadata: { type: mongoose.Schema.Types.Mixed }, // optional tenant settings
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tenant', TenantSchema);
