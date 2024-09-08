


// const express = require("express");
// const Rental = require("../models/Rental");
// const Product = require("../models/Product");
// const router = express.Router();

// // Get rented clothes
// router.get('/rented', async (req, res) => {
//   try {
//     const rentals = await Rental.find(); // Fetch all rentals
//     if (rentals.length === 0) {
//       return res.json({ message: 'No rented products found.' });
//     }
//     res.json(rentals);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Handle checkout
// router.post("/checkout", async (req, res) => {
//   const { name, rentalDate, returnDate, products } = req.body;
  
//   const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  
//   const newRental = new Rental({
//     name,
//     rentalDate,
//     returnDate,
//     products,
//     totalPrice,
//     returned: false, // Set returned status to false initially
//   });

//   try {
//     // Save the rental first
//     const savedRental = await newRental.save();

//     // Update product quantities in the inventory
//     for (const product of products) {
//       const existingProduct = await Product.findById(product.productId); // Assuming the frontend sends productId
//       if (existingProduct) {
//         existingProduct.quantity -= product.quantity;

//         if (existingProduct.quantity < 0) {
//           return res.status(400).json({ message: `Not enough quantity for ${existingProduct.name}` });
//         }

//         await existingProduct.save(); // Save the updated quantity
//       }
//     }

//     res.json(savedRental);
//   } catch (err) {
//     console.error("Error during checkout:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Mark rental as returned
// router.post("/return/:id", async (req, res) => {
//   try {
//     const rental = await Rental.findById(req.params.id);
//     if (!rental) {
//       return res.status(404).json({ message: "Rental not found" });
//     }

//     // Check if rental has already been returned
//     if (rental.returned) {
//       return res.status(400).json({ message: "Rental has already been returned" });
//     }

//     // Update the product quantities back in the inventory
//     for (const rentedProduct of rental.products) {
//       const product = await Product.findById(rentedProduct.productId);
//       if (product) {
//         product.quantity += rentedProduct.quantity; // Return the quantity back to inventory
//         await product.save();
//       }
//     }

//     // Mark the rental as returned
//     rental.returned = true;
//     await rental.save();

//     res.json({ message: "Rental marked as returned", rental });
//   } catch (err) {
//     console.error("Error marking rental as returned:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const mongoose = require("mongoose");
// const Rental = require("../models/Rental");
// const Product = require("../models/Product");

// // Create the express app
// const app = express();
// app.use(express.json());

// // MongoDB connection function
// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// // Get rented clothes
// app.get('/api/rental/rented', async (req, res) => {
//   try {
//     await connectDB(); // Connect to the database
//     const rentals = await Rental.find(); // Fetch all rentals
//     if (rentals.length === 0) {
//       return res.json({ message: 'No rented products found.' });
//     }
//     res.json(rentals);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Handle checkout
// app.post("/api/rental/checkout", async (req, res) => {
//   const { name, rentalDate, returnDate, products } = req.body;
  
//   const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  
//   const newRental = new Rental({
//     name,
//     rentalDate,
//     returnDate,
//     products,
//     totalPrice,
//     returned: false, // Set returned status to false initially
//   });

//   try {
//     await connectDB(); // Connect to the database
    
//     // Save the rental first
//     const savedRental = await newRental.save();

//     // Update product quantities in the inventory
//     for (const product of products) {
//       const existingProduct = await Product.findById(product.productId); // Assuming the frontend sends productId
//       if (existingProduct) {
//         existingProduct.quantity -= product.quantity;

//         if (existingProduct.quantity < 0) {
//           return res.status(400).json({ message: `Not enough quantity for ${existingProduct.name}` });
//         }

//         await existingProduct.save(); // Save the updated quantity
//       }
//     }

//     res.json(savedRental);
//   } catch (err) {
//     console.error("Error during checkout:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Mark rental as returned
// app.post("/api/rental/return/:id", async (req, res) => {
//   try {
//     await connectDB(); // Connect to the database
    
//     const rental = await Rental.findById(req.params.id);
//     if (!rental) {
//       return res.status(404).json({ message: "Rental not found" });
//     }

//     // Check if rental has already been returned
//     if (rental.returned) {
//       return res.status(400).json({ message: "Rental has already been returned" });
//     }

//     // Update the product quantities back in the inventory
//     for (const rentedProduct of rental.products) {
//       const product = await Product.findById(rentedProduct.productId);
//       if (product) {
//         product.quantity += rentedProduct.quantity; // Return the quantity back to inventory
//         await product.save();
//       }
//     }

//     // Mark the rental as returned
//     rental.returned = true;
//     await rental.save();

//     res.json({ message: "Rental marked as returned", rental });
//   } catch (err) {
//     console.error("Error marking rental as returned:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = app;



const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http"); // Import serverless-http for serverless deployment
const Rental = require("../models/Rental");
const Product = require("../models/Product");

// Create the express app
const app = express();
app.use(express.json());

// MongoDB connection function
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Get rented clothes
app.get('/api/rental/rented', async (req, res) => {
  try {
    await connectDB(); // Connect to the database
    const rentals = await Rental.find(); // Fetch all rentals
    if (rentals.length === 0) {
      return res.json({ message: 'No rented products found.' });
    }
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Handle checkout
app.post("/api/rental/checkout", async (req, res) => {
  const { name, rentalDate, returnDate, products } = req.body;
  
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  
  const newRental = new Rental({
    name,
    rentalDate,
    returnDate,
    products,
    totalPrice,
    returned: false, // Set returned status to false initially
  });

  try {
    await connectDB(); // Connect to the database
    
    // Save the rental first
    const savedRental = await newRental.save();

    // Update product quantities in the inventory
    for (const product of products) {
      const existingProduct = await Product.findById(product.productId); // Assuming the frontend sends productId
      if (existingProduct) {
        existingProduct.quantity -= product.quantity;

        if (existingProduct.quantity < 0) {
          return res.status(400).json({ message: `Not enough quantity for ${existingProduct.name}` });
        }

        await existingProduct.save(); // Save the updated quantity
      }
    }

    res.json(savedRental);
  } catch (err) {
    console.error("Error during checkout:", err);
    res.status(500).json({ error: err.message });
  }
});

// Mark rental as returned
app.post("/api/rental/return/:id", async (req, res) => {
  try {
    await connectDB(); // Connect to the database
    
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    // Check if rental has already been returned
    if (rental.returned) {
      return res.status(400).json({ message: "Rental has already been returned" });
    }

    // Update the product quantities back in the inventory
    for (const rentedProduct of rental.products) {
      const product = await Product.findById(rentedProduct.productId);
      if (product) {
        product.quantity += rentedProduct.quantity; // Return the quantity back to inventory
        await product.save();
      }
    }

    // Mark the rental as returned
    rental.returned = true;
    await rental.save();

    res.json({ message: "Rental marked as returned", rental });
  } catch (err) {
    console.error("Error marking rental as returned:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app); // Wrap the express app in serverless function handler
