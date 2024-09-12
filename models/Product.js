// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }, // Added min to prevent negative values
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
