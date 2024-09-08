// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Connection Error:", err));

// // Routes
// const inventoryRoutes = require('./routes/inventory');
// const rentalRoutes = require('./routes/rental');
// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/rental", rentalRoutes);

// // Starting the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const inventoryRoutes = require('./routes/inventory');
const rentalRoutes = require('./routes/rental');
app.use("/api/inventory", inventoryRoutes);
app.use("/api/rental", rentalRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
