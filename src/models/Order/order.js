const mongoose = require("mongoose");

// 🔹 Item Schema
const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number
  }
});

// 🔹 Main Order Schema
const orderSchema = new mongoose.Schema({

  orderId: {
    type: String,
    unique: true
  },

  orderType: {
    type: String,
    enum: ["PO", "SO"],
    required: true
  },

  // 🔥 Conditional Fields
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: function () {
      return this.orderType === "PO";
    }
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: function () {
      return this.orderType === "SO";
    }
  },

  orderDate: {
    type: Date,
    default: Date.now
  },

  status: {
  type: String,
  enum: [
    "CREATED",
    "APPROVED",
    "REJECTED",
    "DISPATCHED",
    "RECEIVED",
    "CANCELLED"
  ],
  default: "CREATED"
},

approvedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},

approvedAt: {
  type: Date
},

cancelledAt: {
  type: Date
},

  items: {
    type: [itemSchema],
    validate: [(arr) => arr.length > 0, "At least one item is required"]
  },

  totalAmount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });


// 🔥 Pre-save hook (clean async version)
orderSchema.pre("save", async function () {
  let total = 0;

  this.items.forEach(item => {
    item.total = item.quantity * item.price;
    total += item.total;
  });

  this.totalAmount = total;
});

module.exports = mongoose.model("Order", orderSchema);