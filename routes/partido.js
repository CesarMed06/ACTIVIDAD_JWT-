const express = require('express');
const router = express.Router();
const Partido = require('../models/partido');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.post('/', verifyToken, verifyRole('admin'), async (req, res) => {
    try {
        const partido = new Partido(req.body);
        await partido.save();
        res.status(201).json(partido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const partidos = await Partido.find();
        res.json(partidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
        res.json(partido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, verifyRole('admin'), async (req, res) => {
    try {
        const partido = await Partido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
        res.json(partido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, verifyRole('admin'), async (req, res) => {
    try {
        const partido = await Partido.findByIdAndDelete(req.params.id);
        if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
        res.json({ mensaje: 'Partido eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;