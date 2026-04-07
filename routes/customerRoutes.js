const express = require('express');
const router = express.Router();
const { getAllCustomers, createCustomer, getCustomerById, updateCustomer } = require('../controllers/customerController');

router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);

module.exports = router;
