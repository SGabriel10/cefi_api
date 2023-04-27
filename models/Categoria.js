const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
    descripcion : {
        type: String,
        required : true
    }
});
module.exports = mongoose.model('Categoria', Categoria);