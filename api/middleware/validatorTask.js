const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "

const validationTaskcodeRules = () => {
    logger.debug(MIDDLEWARE + "validationResentPasswordCodeRules")
    return [
        // param('projectId').isUUID().withMessage('Projectid is not uuid').trim(),
        body('tasks').isArray().withMessage("Tasks are not array")
    ]
}


const validateTaskData = (req, res, next) => {
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
    validateTaskData,
    validationTaskcodeRules
};
