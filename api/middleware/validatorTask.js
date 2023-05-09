const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "

const validationTaskscodeRules = () => {
    logger.debug(MIDDLEWARE + "validationTaskscodeRules")
    return [
        // param('projectId').isUUID().withMessage('Projectid is not uuid').trim(),
        body('tasks').isArray().withMessage("Tasks are not array")
    ]
}
const validationTaskcodeRules = () => {
    logger.debug(MIDDLEWARE + "validationTaskcodeRules")
    return [
        body('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        body('taskName').notEmpty().withMessage("Task name cannot be empty.").trim(),
        body("taskDate").isDate().withMessage("Date is required.").trim()
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
    validationTaskscodeRules,
    validationTaskcodeRules
};
