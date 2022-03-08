const limiter = require('express-rate-limit');

const loginLimiter = limiter({
    windowMs: 5*60*1000,
    max: 5,
    message: {
        code: 429,
        message: 'Toomany request'
    }
})

module.exports = loginLimiter;