const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [50, 'El nombre no puede superar 50 caracteres']
    },
    ciudad: {
        type: String,
        maxlength: [50, 'La ciudad no puede superar 50 caracteres']
    },
    anioFundacion: {
        type: Number
    },
    categoria: {
        type: String
    }
});

module.exports = mongoose.model('Equipo', equipoSchema);