const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
