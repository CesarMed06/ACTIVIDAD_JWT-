const mongoose = require('mongoose');

const partidoSchema = new mongoose.Schema({
    equipoLocal: {
        type: String,
        required: [true, 'El equipo local es obligatorio'],
        maxlength: [50, 'El nombre no puede superar 50 carácteres']
    },
    equipoVisitante: {
        type: String,
        maxlength: [50, 'El nombre no puede superar 50 carácteres']
    },
    golesLocal: {
        type: Number,
        default: 0,
        min: [0, 'Los goles no pueden ser negativos']
    },
    golesVisitante: {
        type: Number,
        default: 0,
        min: [0, 'Los goles no pueden ser negativos']
    },
    jugado: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date
    }
});

module.exports = mongoose.model('Partido', partidoSchema);
