const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending', // other: shipped, delivered, cancelled
    enum: ['pending', 'shipped', 'delivered', 'cancelled']
  },
    address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
