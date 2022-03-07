const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'cdb838483ed734cb53faf4a5a79a11fa');
        const userId = decodeToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw res.status(403).json({ error: new Error(error)})
        } else {
            next();
        }

    }catch {
        res.status(401).json({ message: 'here' })
    } 
}