const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Parking = new Schema({
    fecha_inicio: {
        type: String,
        required : true,
    },
    hora_inicio : {
        type: String,
        required : true
    },
    fecha_fin: {
        type: String,
        required: true,
    },
    hora_fin : {
        type: String,
        required : true,
    },
    nro_chapa : {
        type: String,
        required : true
    },
    total_hs: {
            type: String,
            required: true,
    },
    total : {
        type: String,
        required : true,
    },
});
module.exports = mongoose.model('Parking', Parking);