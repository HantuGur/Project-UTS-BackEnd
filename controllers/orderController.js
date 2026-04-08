const Order = require('../models/Order');
const Menu = require('../models/Menu');

const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('customer', 'name phone')
      .populate('table', 'table_number location')
      .populate('items.menu', 'name price');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { customer, table, items, notes } = req.body;

    const orderItems = [];
    for (const item of items) {
      const menu = await Menu.findById(item.menu);
      if (!menu) {
        return res.status(404).json({
          success: false,
          message: `Menu dengan id ${item.menu} tidak ditemukan`,
        });
      }
      if (!menu.is_available) {
        return res.status(400).json({
          success: false,
          message: `Menu "${menu.name}" sedang tidak tersedia`,
        });
      }
      orderItems.push({ menu: item.menu, quantity: item.quantity, price: menu.price });
    }

    const order = await Order.create({ customer, table, items: orderItems, notes });
    await order.populate([
      { path: 'customer', select: 'name phone' },
      { path: 'table', select: 'table_number' },
      { path: 'items.menu', select: 'name price' },
    ]);

    res.status(201).json({
      success: true,
      message: 'Order berhasil dibuat',
      data: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name phone email')
      .populate('table', 'table_number location')
      .populate('items.menu', 'name price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ['pending', 'processing', 'served', 'paid', 'cancelled'];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status tidak valid. Pilih dari: ${validStatus.join(', ')}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('customer', 'name');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order tidak ditemukan' });
    }

    res.status(200).json({
      success: true,
      message: `Status order berhasil diubah menjadi "${status}"`,
      data: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllOrders, createOrder, getOrderById, updateOrderStatus };


