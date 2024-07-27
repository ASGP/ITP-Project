const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  
  name: {
    type:String,
    required: true,
  },
  
  date: {
    type: Date,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  ribbonColor: {
    type: String,
    required: true,
  },
  wish: {
    type: String,
    required: true,
  },
  address: {
    type:String,
    required: true,
  },
  contactNumber: {
    type:String,
    required: true,
  },
  orderID: {
    type:String,
    required: true,
  },
  packagingType: {
    type:String,
    required: true,
  },
  price: {
    type:Number,
    required: true,
  },
  productID: {
    type:String,
    required: true,
  },
  productName: {
    type:String,
    required: true,
  },
  quantity: {
    type:Number,
    required: true,
  },
  totalPrice: {
    type:Number,
    required: true,
  },
  wieght: {
    type:String,
    required: true,
  },
  wrappingPaper: {
    type:String,
    required: true,
  }, 
  transactionID: {
    type:String,
    required: true,
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
