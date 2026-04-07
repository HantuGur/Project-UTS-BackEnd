const express = require('express');
const router = express.Router();
const { getAllTables, createTable, updateTableStatus } = require('../controllers/tableController');

router.get('/', getAllTables);            // ANGGOTA 5
router.post('/', createTable);           // ANGGOTA 5
router.patch('/:id/status', updateTableStatus);

module.exports = router;
