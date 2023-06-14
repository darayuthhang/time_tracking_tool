const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "
const validationPhoneNumberConsentRules = () => {
    logger.info(MIDDLEWARE + "validatePhoneNumberConsentData")
    return [
        param('userId').isUUID().withMessage('UserId is not uuid').trim(),
        body('phoneNumber').notEmpty().withMessage("PhoneNumber name cannot be empty.").trim(),
        body('countryCode').notEmpty().withMessage("CountryCode name cannot be empty and must be boolean.").trim(),
        body('scheduleDateAndTime').isISO8601().toDate().withMessage("scheduleDateTime cannot be empty and must be boolean.").trim(),
        body("consent").isBoolean().withMessage("Consent cannot be empty."),
        body('timeZone').notEmpty().withMessage("Timezone name cannot be empty.").trim(),
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
