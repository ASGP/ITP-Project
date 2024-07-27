const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shiftSchema = new Schema({

    shift : {
        type : String,
        required : true
    },
    clockIn : {
        type : String,
        required : true
    },
    clockOut : {
        type : String,
        require : true
    }

})

const Shift = mongoose.model("Shift",shiftSchema);

module.exports = Shift;