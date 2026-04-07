const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama menu wajib diisi'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Harga menu wajib diisi'],
      min: [0, 'Harga tidak boleh negatif'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Kategori wajib diisi'],
    },
    image_url: {
      type: String,
      default: '',
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
