// aas-backend/route/parts.js
const express = require('express');
const router = express.Router();
const Part = require('../models/Part');
const { authenticate, requireRole } = require('../middleware/authMiddleware');

// Create part (admin/manager)
router.post('/', authenticate, requireRole('admin','manager'), async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const { sku, name, description, qty = 0, attributes = {} } = req.body;
    const existing = await Part.findOne({ tenantId, sku });
    if (existing) return res.status(409).json({ error: 'SKU already exists' });

    const part = new Part({ tenantId, sku, name, description, qty, attributes });
    await part.save();
    return res.status(201).json(part);
  } catch (err) {
    console.error('create part', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// List parts (any authenticated role)
router.get('/', authenticate, async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const parts = await Part.find({ tenantId }).sort({ name: 1 });
    return res.json(parts);
  } catch (err) {
    console.error('list parts', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update part (admin/manager)
router.put('/:id', authenticate, requireRole('admin','manager'), async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const update = req.body;
    const part = await Part.findOneAndUpdate({ _id: req.params.id, tenantId }, update, { new: true });
    if (!part) return res.status(404).json({ error: 'Not found' });
    return res.json(part);
  } catch (err) {
    console.error('update part', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
