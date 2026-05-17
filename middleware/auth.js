const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Token requerido' });
    try {
        req.user = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Token inválido' });
    }
};

const verifyRole = (...roles) => (req, res, next) => {
    if (!req.user?.roles?.some(r => roles.includes(r)))
        return res.status(403).json({ error: 'Acceso denegado' });
    next();
};

module.exports = { verifyToken, verifyRole };