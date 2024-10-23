const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Upload = new Schema({
    url : {
        type: String,
        required : true
    },
    nombre: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Upload', Upload);