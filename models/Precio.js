const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Precio = new Schema({
    descripcion : {
        type: String,
        required : true
    },

    precio : {
        type: String,
        required : true,
        unique: true
    },
    duracion : {
        type: String,
        required : true
    },
});
module.exports = mongoose.model('Precio', Precio);