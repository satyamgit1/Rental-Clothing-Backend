// // models/Rental.js
// const mongoose = require("mongoose");

// const RentalSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true }, // Added mobile field
//   rentalDate: { type: Date, required: true },
//   returnDate: { type: Date, required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       name: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//     },
//   ],
//   totalPrice: { type: Number, required: true },
//   returned: { type: Boolean, default: false },
// }, { timestamps: true });

// module.exports = mongoose.model("Rental", RentalSchema);



// models/Rental.js
const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String }, // Include mobile if not already
  rentalDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      advanceAmount: { type: Number, default: 0 }, // New field for advance amount
    },
  ],
  totalPrice: { type: Number, required: true },
  remainingAmount: { type: Number, default: 0 }, // New field for remaining amount
  returned: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Rental", RentalSchema);
