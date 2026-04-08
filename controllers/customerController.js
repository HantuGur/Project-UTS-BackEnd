const Customer = require('../models/Customer');

// GET semua customer
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort('-createdAt');
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST tambah customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Customer berhasil ditambahkan',
      data: customer,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer tidak ditemukan' });
    }
    res.status(200).json({
      success: true,
      message: 'Customer berhasil diupdate',
      data: customer,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllCustomers, createCustomer, getCustomerById, updateCustomer };
