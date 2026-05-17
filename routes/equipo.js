const express = require('express');
const router = express.Router();
const Equipo = require('../models/equipo');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.post('/', verifyToken, verifyRole('admin'), async (req, res) => {
    try {
        const equipo = new Equipo(req.body);
        await equipo.save();
        res.status(201).json(equipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const equipos = await Equipo.find();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const equipo = await Equipo.findById(req.params.id);
        if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
        res.json(equipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, verifyRole('admin'), async (req, res) => {
    try {
        const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
        res.json(equipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, verifyRole('admin'), async (req, res) => {
    try {
        const equipo = await Equipo.findByIdAndDelete(req.params.id);
        if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
        res.json({ mensaje: 'Equipo eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;