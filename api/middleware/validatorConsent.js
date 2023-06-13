const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "

const validateTimestamp = (value) => {
    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)) {
        throw new Error('Invalid timestamp format. Please use yyyy-mm-dd hh:mm.');
    }

    return true;
};
const validationPhoneNumberConsentRules = () => {
    logger.info(MIDDLEWARE + "validatePhoneNumberConsentData")
    return [
        param('userId').isUUID().withMessage('UserId is not uuid').trim(),
        body('phoneNumber').notEmpty().withMessage("PhoneNumber name cannot be empty.").trim(),
        body('countryCode').notEmpty().withMessage("CountryCode name cannot be empty and must be boolean.").trim(),
        body('scheduleDateAndTime').custom(validateTimestamp).withMessage("scheduleDateTime cannot be empty and must be boolean.").trim(),
        body("consent").isBoolean().withMessage("Consent cannot be empty."),
        //HH:mm
      
    ]
}
const validatePhoneNumberConsentData = (req, res, next) => {
    logger.info(MIDDLEWARE + "validatePhoneNumberConsentData")
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
    validationPhoneNumberConsentRules,
    validatePhoneNumberConsentData

};
