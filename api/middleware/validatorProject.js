const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "

const validationProjectcodeRules = () => {
    logger.debug(MIDDLEWARE + "validationResentPasswordCodeRules")
    return [
        param('userId').isUUID().withMessage('UserId is not uuid').trim(),
        body('projectName')
            .notEmpty()
            .withMessage('Project name cannot be empty')
            .trim(),
        body('project_description').trim()
    ]
}

const validationUserIdcodeRules = () => {
    logger.debug(MIDDLEWARE + "validationUserIdcodeRules")
    return [
        param('userId').isUUID().withMessage('UserId is not uuid').trim()
    ]
}
const validationUserAndProjectIdcodeRules = () => {
    logger.debug(MIDDLEWARE + "validationUserIdcodeRules")
    return [
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        param('userId').isUUID().withMessage('userId is not uuid').trim(),
        body('projectName')
            .notEmpty()
            .withMessage('Project name cannot be empty')
            .trim(),
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
    validateProjectData,
    validationUserIdcodeRules,
    validationUserAndProjectIdcodeRules
};
