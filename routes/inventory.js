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
//       { new: true }
//     );
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a product
router.post("/", async (req, res) => {
  const { name, category, quantity, price } = req.body;
  const newProduct = new Product({ name, category, quantity, price });
  
  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product quantity and price
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
