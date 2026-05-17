const mongoose = require('mongoose');

const jugadorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [50, 'El nombre no puede superar 50 caracteres']
    },
    posicion: {
        type: String
    },
    dorsal: {
        type: Number
    },
    equipo: {
        type: String
    }
});

module.exports = mongoose.model('Jugador', jugadorSchema);