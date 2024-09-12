// routes/rental.js
const express = require("express");
const Rental = require("../models/Rental");
const Product = require("../models/Product");
const router = express.Router();

// Helper function to calculate total price
const calculateTotalPrice = (products) => {
  return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
};

// Get rented items
router.get('/rented', async (req, res) => {
  try {
    const rentals = await Rental.find();
    if (!rentals.length) return res.json({ message: 'No rented products found.' });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Handle checkout
router.post("/checkout", async (req, res) => {
  const { name, rentalDate, returnDate, products } = req.body;

  const newRental = new Rental({
    name,
    rentalDate,
    returnDate,
    products,
    totalPrice: calculateTotalPrice(products),
    returned: false,
  });

  try {
    const savedRental = await newRental.save();

    for (const product of products) {
      const existingProduct = await Product.findById(product.productId);
      if (!existingProduct) continue;
      
      if (existingProduct.quantity < product.quantity) {
        return res.status(400).json({ message: `Insufficient quantity for ${existingProduct.name}` });
      }

      existingProduct.quantity -= product.quantity;
      await existingProduct.save();
    }

    res.json(savedRental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark rental as returned
router.post("/return/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (rental.returned) {
      return res.status(400).json({ message: "Rental has already been returned" });
    }

    for (const rentedProduct of rental.products) {
      const product = await Product.findById(rentedProduct.productId);
      if (product) {
        product.quantity += rentedProduct.quantity;
        await product.save();
      }
    }

    rental.returned = true;
    await rental.save();

    res.json({ message: "Rental marked as returned", rental });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
