require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const equipoRoutes = require('./routes/equipo');
const jugadorRoutes = require('./routes/jugador');
const partidoRoutes = require('./routes/partido');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar:', err));

app.get('/health', async (req, res) => {
    const dbState = mongoose.connection.readyState;
    if (dbState === 1) {
        res.json({ status: 'ok', db: 'conectada' });
    } else {
        res.status(503).json({ status: 'error', db: 'desconectada' });
    }
});

app.use('/auth', authRoutes);
app.use('/equipos', equipoRoutes);
app.use('/jugadores', jugadorRoutes);
app.use('/partidos', partidoRoutes);

app.use((err, req, res, next) => {
    console.error('ERROR GLOBAL:', err);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;
