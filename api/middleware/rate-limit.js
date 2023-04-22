const rateLimit = require('express-rate-limit');

const _15MINTUES = 15 * 60 * 1000
const _10SECOND = 10000
const resentOtpLimiter = rateLimit({
    windowMs: _15MINTUES, // 15 minutes
    max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const resentPasswordLimiter = rateLimit({
    windowMs: _15MINTUES, // 15 minutes
    max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const updatePasswordLimiter = rateLimit({
    windowMs: _15MINTUES, // 15 minutes
    max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



module.exports = {
    resentOtpLimiter,
    resentPasswordLimiter,
    updatePasswordLimiter
}
