const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["Jeans", "Shirts", "T-Shirts"],
  },
  quantity: Number,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
