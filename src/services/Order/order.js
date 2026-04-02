const mongoose = require("mongoose");

// 🔥 IMPORTANT: Register all referenced models
require("../../models/Products/productModel");

const Order = require("../../models/Order/order");

exports.createOrder = async (data) => {
  try {
    // 🔹 Validate orderType
    if (!["PO", "SO"].includes(data.orderType)) {
      throw new Error("Invalid orderType. Use PO or SO");
    }

    // 🔹 Validate items
    if (!data.items || data.items.length === 0) {
      throw new Error("At least one item is required");
    }

    // 🔹 Conditional validation
    if (data.orderType === "PO") {
      if (!data.supplierId) {
        throw new Error("supplierId is required for PO");
      }
      if (!mongoose.Types.ObjectId.isValid(data.supplierId)) {
        throw new Error("Invalid supplierId");
      }
    }

    if (data.orderType === "SO") {
      if (!data.customerId) {
        throw new Error("customerId is required for SO");
      }
      if (!mongoose.Types.ObjectId.isValid(data.customerId)) {
        throw new Error("Invalid customerId");
      }
    }

    // 🔹 Generate Order ID
    const orderId = `${data.orderType}-${Date.now()}`;

    // 🔹 Validate items
    const items = data.items.map(item => {
      if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
        throw new Error("Invalid productId");
      }

      if (!item.quantity || item.quantity <= 0) {
        throw new Error("Invalid quantity");
      }

      if (!item.price || item.price < 0) {
        throw new Error("Invalid price");
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      };
    });

    // 🔹 Build Order
    const order = new Order({
      orderId,
      orderType: data.orderType,
      supplierId: data.orderType === "PO" ? data.supplierId : undefined,
      customerId: data.orderType === "SO" ? data.customerId : undefined,
      items,
      status: "CREATED"
    });

    // 🔹 Save
    const result = await order.save();

    return result;

  } catch (err) {
    throw err;
  }
};

exports.updateOrderStatus = async ({ orderId, action, userId }) => {
  try {
    // 🔹 Validate action
    if (!["APPROVE", "CANCEL"].includes(action)) {
      throw new Error("Invalid action. Use APPROVE or CANCEL");
    }

    // 🔹 Find Order
    const order = await Order.findOne({ orderId });

    if (!order) {
      throw new Error("Order not found");
    }

    // 🔹 Only CREATED orders can be changed
    if (order.status !== "CREATED") {
      throw new Error(`Order already ${order.status}, cannot modify`);
    }

    // 🔥 APPROVE FLOW
    if (action === "APPROVE") {
      order.status = "APPROVED";
      order.approvedBy = new mongoose.Types.ObjectId(userId);
      order.approvedAt = new Date();
    }

    // 🔥 CANCEL FLOW
    if (action === "CANCEL") {
      order.status = "CANCELLED";
      order.cancelledAt = new Date();
    }

    // 🔹 Save
    await order.save();

    return order;

  } catch (err) {
    throw err;
  }
};

exports.getAllOrders = async (query) => {
  try {
    // 🔹 Pagination params
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    // 🔹 Filters
    const filter = {};

    if (query.orderType) {
      filter.orderType = query.orderType; // PO / SO
    }

    if (query.status) {
      filter.status = query.status;
    }

    // 🔹 Search (optional - by orderId)
    if (query.search) {
      filter.orderId = { $regex: query.search, $options: "i" };
    }

    // 🔹 Query
    const orders = await Order.find(filter)
      .populate("supplierId", "name")   // only name field
      .populate("customerId", "name")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    // 🔹 Total count
    const total = await Order.countDocuments(filter);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: orders
    };

  } catch (err) {
    throw err;
  }
};

exports.AllOrderId= async()=>{
  const orders = await Order.find().select('orderId -_id');
  
  return orders.map(o => o.orderId);
}
