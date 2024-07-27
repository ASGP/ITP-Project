const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ccode: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
