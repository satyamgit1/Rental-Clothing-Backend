const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
