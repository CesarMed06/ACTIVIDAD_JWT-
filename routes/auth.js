const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/usuario');

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ mensaje: 'Usuario creado' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.comparePassword(req.body.password)))
            return res.status(401).json({ error: 'Credenciales incorrectas' });

        const payload = { id: user._id, username: user.username, roles: user.roles };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.json({ token, refreshToken });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token requerido' });
    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const token = jwt.sign(
            { id: payload.id, username: payload.username, roles: payload.roles },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        res.json({ token });
    } catch {
        res.status(401).json({ error: 'Refresh token inválido' });
    }
});

module.exports = router;