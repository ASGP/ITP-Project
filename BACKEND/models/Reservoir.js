const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservoirSchema = new Schema({

    pump_number : {
        type : String,
       // required : true
    },
    fuel_type : {
        type : String,
        //required : true
    },
    date : {
        type : String,
       // required : true
    },
    employeeID : {
        type : String,
       // required : true
    },
    mReading : {
        type : String,
       // required : true
    },
    litterPrice : {
        type : String,
       // required : true

    },
    eReading : {
        type : String,
       // required : true
    }

})

const Reservoir = mongoose.model("Reservoir",reservoirSchema);

module.exports = Reservoir;