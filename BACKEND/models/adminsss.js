const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({

    accountNumber : {
        type : Number,
        required : true
    },
    accountName : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true
    },
    accountType : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    }
})

const Financial = mongoose.model("Financial",adminSchema);

module.exports = Financial;