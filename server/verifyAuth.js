const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to view this page!' });
    }
    next();
};

const isMaster = (req, res, next) => {
    if (!req.user || req.user.role !== 'master') {
        return res.status(403).json({ message: 'Forbidden: Master access required' });
    }
    next();
};

module.exports = { verifyToken, isAdmin, isMaster };
