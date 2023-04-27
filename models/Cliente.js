const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cliente = new Schema({
    name : {
        type: String,
        required : true
    },
        last_name : {
            type: String,
            required : true
        },

    ruc : {
        type: String,
        required : true,
        unique: true
    },
    phone : {
        type: String,
        required : true
    },
    address : {
        type: String,
        required : true
    },
});
module.exports = mongoose.model('Cliente', Cliente);