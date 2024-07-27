const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    empNo : {
        type : String,
        required : true
    },
    contactNo : {
        type : String,
        required : true
    },
    join : {
        type : String,
        required : true
    },
    workHours : {
        type : String,
        required : true
    },
    otHours : {
        type : String,
        required : true
    },
    shift : {
        type : String,
        required : true
    }
})

const Attendance = mongoose.model("Attendance",attendanceSchema);

module.exports = Attendance;