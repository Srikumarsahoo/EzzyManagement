const mongoose = require('mongoose');
const PartSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  quantity: Number,
  manufacturer: String,
  rackNumber: String
});
module.exports = mongoose.model('Part', PartSchema);
