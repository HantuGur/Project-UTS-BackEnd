const express = require('express');
const router = express.Router();
const { getAllMenu, createMenu, getMenuById, updateMenu, deleteMenu } = require('../controllers/menuController');

router.get('/', getAllMenu);       // ANGGOTA 1
router.post('/', createMenu);      // ANGGOTA 1
router.get('/:id', getMenuById);   // ANGGOTA 2
router.put('/:id', updateMenu);    // ANGGOTA 2
router.delete('/:id', deleteMenu);

module.exports = router;
