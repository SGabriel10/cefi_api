const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cabecera = new Schema({
    nombre: {
        type: String,
        required : true,
    },
    propietario: {
        type: String,
        required : true,
    },
    ruc: {
        type: String,
        required: true,
    },
    direccion : {
        type: String,
        required : true
    },
    telefono: {
        type: String,
        required: true,
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'Upload',
        required : true
    },
});
module.exports = mongoose.model('Cabecera', Cabecera);