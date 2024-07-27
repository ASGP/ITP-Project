const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  sellerID: {
    type: String,
    required: true,
  },
  orderID: {
    type: String,
    required: true,
  },
  transactionID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Refund = mongoose.model("Refund", refundSchema);

module.exports = Refund;
