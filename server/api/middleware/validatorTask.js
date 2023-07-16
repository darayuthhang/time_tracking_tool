const { body, validationResult, query, param } = require('express-validator');
const logger = require("../../utils/error-handler")

let MIDDLEWARE = "MIDDLEWARE ===> "

const validationTaskscodeRules = () => {
    
    return [
        // param('projectId').isUUID().withMessage('Projectid is not uuid').trim(),
        body('tasks').isArray().withMessage("Tasks are not array")
    ]
}
const validationTaskcodeRules = () => {
    logger.info(MIDDLEWARE + "validationTaskcodeRules")
    return [
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        body('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        body('taskName').notEmpty().withMessage("Task name cannot be empty.").trim(),
        body("taskDate").isDate().withMessage("Date is required.").trim(),
        body("taskStatus").notEmpty().withMessage("Task status cannot be empty").trim()
    ]
}
const validationProjectIdTaskcodeRules = () => {
    
    return [
        // param('projectId').isUUID().withMessage('Projectid is not uuid').trim(),
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
    ]
}
const validationDeleteProjectTaskcodeRules = () => {
  
    return [
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        param('taskId').isUUID().withMessage('taskId is not uuid').trim(),
    ]
}
const validationUpdateProjectTaskcodeRules = () => {
  
    return [
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim(),
        param('taskId').isUUID().withMessage('taskId is not uuid').trim(),
      
    ]
}
const validationProjectIdAndTaskscodeRules = () => {
    

    return [
       
        // param('projectId').isUUID().withMessage('Projectid is not uuid').trim(),
        param('projectId').isUUID().withMessage('ProjectId is not uuid').trim()
    ]
}
const validateTaskData = (req, res, next) => {
   
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
    validateTaskData,
    validationTaskscodeRules,
    validationTaskcodeRules,
    validationProjectIdTaskcodeRules,
    validationDeleteProjectTaskcodeRules,
    validationProjectIdAndTaskscodeRules,
    validationUpdateProjectTaskcodeRules
};
