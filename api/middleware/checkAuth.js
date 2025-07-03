const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'sbs online classes 123');
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: 'invalid token'
        });
    }
};