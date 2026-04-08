const Menu = require('../models/Menu');

const getAllMenu = async (req, res) => {
  try {
    const { category, available } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (available !== undefined) filter.is_available = available === 'true';

    const menus = await Menu.find(filter).populate('category', 'name');
    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    await menu.populate('category', 'name');
    res.status(201).json({
      success: true,
      message: 'Menu berhasil ditambahkan',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('category', 'name');
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('category', 'name');

    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });
    }
    res.status(200).json({
      success: true,
      message: 'Menu berhasil diupdate',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Menu berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllMenu, createMenu, getMenuById, updateMenu, deleteMenu };
