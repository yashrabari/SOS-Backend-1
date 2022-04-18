const jwt = require('jsonwebtoken');
const config = require('../config/database');

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            success: false,
            message: 'No token provided'
        });
    }
}

module.exports = verifyUser;
