const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  name: String,
  rentalDate: Date,
  returnDate: Date,
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      category: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
});

module.exports = mongoose.model("Rental", rentalSchema);
