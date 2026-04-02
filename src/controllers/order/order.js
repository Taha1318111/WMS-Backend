const service = require("../../services/Order/order");

exports.createOrder = async (req, res) => {
  try {
    const result = await service.createOrder(req.body);

    res.status(201).json({
      message: "Order Created Successfully",
      data: result
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

exports.updateOrderStatusController = async (req, res) => {
  try {
    const { orderId, action } = req.body;
    const userId = req.user.id; // 🔥 from auth middleware

    const result = await service.updateOrderStatus({
      orderId,
      action,
      userId
    });

    res.status(200).json({
      message: `Order ${action} successful`,
      data: result
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

exports.getAllOrdersController = async (req, res) => {
  try {
    const result = await service.getAllOrders(req.query);

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.AllOrderId=async (req,res)=>{
  try {
    const orderIds = await service.AllOrderId();
    res.status(200).json({ orderIds });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
