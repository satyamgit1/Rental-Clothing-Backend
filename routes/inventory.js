// const express = require("express");
// const Product = require("../models/Product");
// const router = express.Router();

// // Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add a product
// router.post("/", async (req, res) => {
//   const { name, category, quantity, price } = req.body;
//   const newProduct = new Product({ name, category, quantity, price });

//   try {
//     const savedProduct = await newProduct.save();
//     res.json(savedProduct);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // Update product quantity and price
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true, runValidators: true } // Run validators to ensure data integrity
//     );
//     if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
//     res.json(updatedProduct);
//   } catch (err) {
//     handleError(res, err, "Error updating product");
//   }
// });

// // Delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     handleError(res, err, "Error deleting product");
//   }
// });

// module.exports = router;


// routes/inventory.js
const express = require('express');
const Product = require('../models/Product');
const { sendLowInventoryEmail } = require('../utils/mailer'); // Import the mailer function
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a product
router.post('/', async (req, res) => {
  const { name, category, quantity, price } = req.body;
  const newProduct = new Product({ name, category, quantity, price });

  try {
    const savedProduct = await newProduct.save();
    
    // Check if the quantity is less than 3 and send an email
    if (savedProduct.quantity < 3) {
      await sendLowInventoryEmail(savedProduct);
    }

    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product quantity and price
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // Run validators to ensure data integrity
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    // Check if the quantity is less than 3
    if (updatedProduct.quantity < 3) {
      await sendLowInventoryEmail(updatedProduct); // Send the low inventory alert email
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
