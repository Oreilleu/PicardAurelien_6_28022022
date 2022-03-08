const jwt = require('jsonwebtoken');
require('dotenv').config();

// Récupère la seconde valeur de authorization, vérifie le token avec la key et récupère userId
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.AUTH_KEY);
        const userId = decodeToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw res.status(403).json({ message: 'unauthorized request'})
        } else {
            next();
        }

    }catch {
        res.status(403).json({ message: 'unauthorized request' })
    } 
}