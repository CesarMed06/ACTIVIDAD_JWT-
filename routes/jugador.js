const express = require('express');
const router = express.Router();
const Jugador = require('../models/Jugador');

router.post('/', async (req, res) => {
    try {
        const jugador = new Jugador(req.body);
        await jugador.save();
        res.status(201).json(jugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const jugadores = await Jugador.find().populate('equipo');
        res.json(jugadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const jugador = await Jugador.findById(req.params.id).populate('equipo');
        if (!jugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(jugador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const jugador = await Jugador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('equipo');
        if (!jugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json(jugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const jugador = await Jugador.findByIdAndDelete(req.params.id);
        if (!jugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        res.json({ mensaje: 'Jugador eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
