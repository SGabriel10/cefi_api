const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Producto = new Schema({
    descripcion : {
        type: String,
        required : true
    },
    precio_unitario : {
        type: Number
    },
    cantidad: {
        type: Number
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required : true
    }
});
module.exports = mongoose.model('Producto', Producto);