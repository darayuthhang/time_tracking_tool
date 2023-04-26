const { body, validationResult } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "
/**
 * 
 * @NORMALIZE EMAIL WILL CONVERT email to lower case
 */
const validationUserDataRules = () => {
    logger.debug(MIDDLEWARE + "validationUserDataRules")
    
    return [
        body('firstName')
            .matches(/^[a-zA-Z0-9_]*$/)
            .withMessage('Username must only contain letters, numbers, and underscores')
            .trim(),
        body('lastName')
            .matches(/^[a-zA-Z0-9_]*$/)
            .withMessage('Username must only contain letters, numbers, and underscores')
            .trim(),

        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('Please enter a valid email address')
            .normalizeEmail()
            .trim(),

        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .withMessage('Password must contain at least one letter and one number')
    ];
};
const validationUserLoginDataRules = () => {
    logger.debug(MIDDLEWARE + "validationUserLoginDataRules")

    return [
        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('Please enter a valid email address')
            .normalizeEmail()
            .trim(),

        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .withMessage('Password must contain at least one letter and one number')
    ];
};
const validationVerificationCodeRules = () => {
    logger.debug(MIDDLEWARE + "validationVerificationCodeRules")

    return [
        body('verificationCode').exists().trim().withMessage('Verifcation does not exist'),
        body('email').notEmpty().normalizeEmail().trim().withMessage('Email does not exist'),
    ]
}
const validationResentOtpCodeRules = () => {
    logger.debug(MIDDLEWARE + "validationResentOtpCodeRules")
    return [
        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('Please enter a valid email address')
            .normalizeEmail()
            .trim()

    ]
}
const validationResentPasswordCodeRules = () => {
    logger.debug(MIDDLEWARE + "validationResentPasswordCodeRules")
    return [
        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('Please enter a valid email address')
            .normalizeEmail()
            .trim()

    ]
}

const validationUserPasswordDataRules = () => {
    logger.debug(MIDDLEWARE + "validationUserDataRules")

    return [
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .withMessage('Password must contain at least one letter and one number')
    ];
};

/**
 * @ValidationProjectDataRules
 */


const validateUserData = (req, res, next) => {
    logger.debug(MIDDLEWARE + "validateUserData")
    const errors = validationResult(req);
    
    //there is no error.
    if (errors.isEmpty()) {
        return next();
    }else{
        logger.debug(errors)
    }

    return res.status(422).json({
        errors: errors.array(),
    });
};

module.exports = {
    validationUserDataRules,
    validationVerificationCodeRules,
    validateUserData,
    validationResentOtpCodeRules,
    validationUserLoginDataRules,
    validationResentPasswordCodeRules,
    validationUserPasswordDataRules
};
