const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderById, updateOrderStatus } = require('../controllers/orderController');

router.get('/', getAllOrders);              // ANGGOTA 3
router.post('/', createOrder);             // ANGGOTA 3
router.get('/:id', getOrderById);          // ANGGOTA 4
router.patch('/:id/status', updateOrderStatus); // ANGGOTA 4

module.exports = router;
