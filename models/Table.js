const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
  {
    table_number: {
      type: Number,
      required: [true, 'Nomor meja wajib diisi'],
      unique: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Kapasitas meja wajib diisi'],
      min: 1,
    },
    status: {
      type: String,
      enum: ['available', 'occupied', 'reserved'],
      default: 'available',
    },
    location: {
      type: String,
      enum: ['indoor', 'outdoor', 'vip'],
      default: 'indoor',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Table', tableSchema);
