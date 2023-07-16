const rateLimit = require('express-rate-limit');

const _15MINTUES = 15 * 60 * 1000;
const _1MINTUE = 60 * 1000;
const _10SECOND = 10000
/**
 * @limit each ip refer to limit each computer user use.
 */
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

const accessTokenLimitter = rateLimit({
    windowMs: _15MINTUES, // 15 minutes
    max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const stripeTimeLimit = rateLimit({
    windowMs: _15MINTUES, // 1 minute (time window for rate limiting)
    max: 100, // maximum number of requests allowed in the time window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const taskTimeLimit = rateLimit({
    windowMs: _1MINTUE, // 1 minute (time window for rate limiting)
    max: 100, // maximum number of requests allowed in the time window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const projectTimeLimit = rateLimit({
    windowMs: _1MINTUE, // 1 minute (time window for rate limiting)
    max: 100, // maximum number of requests allowed in the time window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const consentTimeLimit = rateLimit({
    windowMs: _1MINTUE, // 1 minute (time window for rate limiting)
    max: 100, // maximum number of requests allowed in the time window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const userRateLimit = rateLimit({
    windowMs: _1MINTUE, // 1 minute (time window for rate limiting)
    max: 100, // maximum number of requests allowed in the time window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = {
    resentOtpLimiter,
    resentPasswordLimiter,
    updatePasswordLimiter,
    accessTokenLimitter,
    stripeTimeLimit,
    taskTimeLimit,
    projectTimeLimit,
    consentTimeLimit,
    userRateLimit
}
