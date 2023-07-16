const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "

const validationProjectcodeRules = () => {

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
   
    return [
        param('userId').isUUID().withMessage('UserId is not uuid').trim()
    ]
}
const validationUserAndProjectIdProjectNamecodeRules = () => {
   
    return [
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        param('userId').isUUID().withMessage('userId is not uuid').trim(),
        body('projectName')
            .notEmpty()
            .withMessage('Project name cannot be empty')
            .trim(),
    ]
}
const validationUserAndProjectIdcodeRules = () => {
 
    return [
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        param('userId').isUUID().withMessage('userId is not uuid').trim()
    ]
}
const validateProjectData = (req, res, next) => {

    const errors = validationResult(req);

    //there is no error.
    if (errors.isEmpty()) {
        return next();
    } else {
        logger.info(errors)
    }

    return res.status(422).json({
        errors: errors.array(),
    });
};

module.exports = {
    validationProjectcodeRules,
    validateProjectData,
    validationUserIdcodeRules,
    validationUserAndProjectIdcodeRules,
    validationUserAndProjectIdProjectNamecodeRules
};
