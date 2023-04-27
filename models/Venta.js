const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Venta = new Schema({
    fecha : {
        type: Date
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required : true
    },
    total:{
        type: Number
    }
});
module.exports = mongoose.model('Venta', Venta);