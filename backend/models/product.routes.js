const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

// LIST PRODUK PUBLIK
router.get('/', async (req, res) => {
  try {
    const data = await Product.listProducts();
    res.json(data);
  } catch (err) {
    console.error('[products:list]', err);
    res.status(500).json({ error: 'failed to fetch products' });
  }
});

// DETAIL PRODUK PUBLIK
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'invalid id' });
    }

    const row = await Product.getById(id);

    if (!row) {
      return res.status(404).json({ error: 'product not found' });
    }

    res.json(row);
  } catch (err) {
    console.error('[products:get]', err);
    res.status(500).json({ error: 'failed to fetch product' });
  }
});

module.exports = router;