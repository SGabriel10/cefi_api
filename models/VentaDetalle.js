const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaDetalle = new Schema({
    producto : {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required : true
    },
    cantidad: {
        type: Number
    },
    venta: {
        type: Schema.Types.ObjectId,
        ref: 'Venta',
        required : true
    }
});
module.exports = mongoose.model('VentaDetalle', VentaDetalle);