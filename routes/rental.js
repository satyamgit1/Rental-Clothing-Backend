const express = require("express");
const Rental = require("../models/Rental");
const Product = require("../models/Product");
const router = express.Router();

// Handle checkout
router.post("/checkout", async (req, res) => {
  const { name, rentalDate, returnDate, products } = req.body;
  
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  
  const newRental = new Rental({
    name,
    rentalDate,
    returnDate,
    products,
    totalPrice,
  });

  try {
    const savedRental = await newRental.save();
    res.json(savedRental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
