const express = require('express');
const router = express.Router();
const { getAllPorts, addPort, updatePort, deletePort } = require('../models/portModel');

// GET /ports
router.get('/', async (req, res) => {
  try {
    const ports = await getAllPorts();
    res.json({ success: true, data: ports });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /ports
router.post('/', async (req, res) => {
  try {
    const newPort = await addPort(req.body);
    res.status(201).json({ success: true, data: newPort });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// PUT /ports/:id – bir port kaydını güncelle
router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updated = await updatePort(id, req.body);
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await deletePort(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Port not found' });
      }
      res.json({ success: true, data: deleted });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

module.exports = router;
