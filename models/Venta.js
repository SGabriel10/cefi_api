const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Venta = new Schema({
    fecha : {
        type: Date
    },
    vendedor:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
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