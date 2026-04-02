require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authMiddleware = require("./src/middleware/middleware");
const authorizeRoles = require("./src/middleware/roleBasedMiddleware");
const roleRoutes = require("./src/routes/Role/role");
const authRoutes = require("./src/routes/AuthRoutes");
const categoryRoutes = require("./src/routes/product/ProductCateg");
const productRoutes = require("./src/routes/product/productRoute");
const warehouseRoutes = require("./src/routes/warehouse/warehouse");
const locationRoutes = require("./src/routes/warehouse/location");
const partyRoutes=require("./src/routes/Party/Party")
const order=require("./src/routes/order/order")
const app = express();


// ✅ CORS FIRST (VERY IMPORTANT)
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization","ngrok-skip-browser-warning"], methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// Middleware
app.use(express.json());
app.use("/api/roles", roleRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Public Route
app.use("/api/auth", authRoutes);
app.use("/api/Order",authMiddleware,order)
app.use("/api/Party",partyRoutes)
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