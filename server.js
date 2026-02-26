require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const authMiddleware = require("./src/middleware/middleware");
const authorizeRoles = require("./src/middleware/roleBasedMiddleware");

const authRoutes = require("./src/routes/AuthRoutes");
const categoryRoutes = require("./src/routes/product/ProductCateg");
const productRoutes = require("./src/routes/product/productRoute");
const warehouseRoutes = require("./src/routes/warehouse/warehouse");
const locationRoutes = require("./src/routes/warehouse/location");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Public Route
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/categories", authMiddleware, categoryRoutes);

app.use(
  "/api/warehouses",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN", "WAREHOUSE_MANAGER"),
  warehouseRoutes
);

app.use(
  "/api/locations",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN", "WAREHOUSE_MANAGER"),
  locationRoutes
);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});