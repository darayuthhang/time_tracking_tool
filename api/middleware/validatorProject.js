const { body, validationResult, query } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "
const validationProjectcodeRules = () => {
    logger.debug(MIDDLEWARE + "validationResentPasswordCodeRules")
    return [
        query('userId').isUUID().withMessage('UserId is not uuid'),
        body('projectName')
            .notEmpty()
            .withMessage('Project name cannot be empty')
            .trim(),
        body('description').trim()
    ]
}


const validateProjectData = (req, res, next) => {
    logger.debug(MIDDLEWARE + "validateUserData")
    const errors = validationResult(req);

    //there is no error.
    if (errors.isEmpty()) {
        return next();
    } else {
        logger.debug(errors)
    }

    return res.status(422).json({
        errors: errors.array(),
    });
};

module.exports = {
    validationProjectcodeRules,
    validateProjectData
};
