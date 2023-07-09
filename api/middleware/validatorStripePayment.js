const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "
const validationStripePaymentData = () => {
  
    return [
        body('userId')
        .isUUID()
        .withMessage('UserId is not uuid').trim(),
    ]
}
const validationStripeUnsubscribeData = () => {
    return [
        param('userId')
            .isUUID()
            .withMessage('UserId is not uuid').trim(),
    ]
}
const validationStripePaymentRule = (req, res, next) => {
  
    const errors = validationResult(req);

    //there is no error.
    if (errors.isEmpty()) {
        return next();
    } else {
        logger.error(errors)
    }
    return res.status(422).json({
        errors: errors.array(),
    });
};

module.exports = {
    validationStripePaymentData,
    validationStripeUnsubscribeData,
    validationStripePaymentRule
};
