// aas-backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_env';

exports.authenticate = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Attach basic info to request
    req.user = { id: payload.userId, role: payload.role };
    req.tenantId = payload.tenantId;
    // optional: fetch full user profile if needed
    // req.userDoc = await User.findById(payload.userId);
    return next();
  } catch (err) {
    console.error('token verify error', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Simple role gate middleware: requireRole('admin','manager')
exports.requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden: insufficient role' });
  }
  return next();
};
