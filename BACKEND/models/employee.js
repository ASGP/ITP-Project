const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  idNo: {
    type: String,
    required: true,
    unique: true,
  },
  contactNO: {
    type: String,
    //required : true
  },
  basicSallary: {
    type: Number,
    required: true,
  },
  allowance: {
    type: Number,
    //required : true
  },
  deductions: {
    type: Number,
    // required : true
  },
  join: {
    type: String,
    required: true,
  },
  pariod: {
    type: Number,
    //required : true
  },
  ot: {
    type: Number,
    //required : true
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
