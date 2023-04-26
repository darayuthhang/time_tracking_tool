const validationResentPasswordCodeRules = () => {
    logger.debug(MIDDLEWARE + "validationResentPasswordCodeRules")
    return [
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
    validationResentPasswordCodeRules,
    validateProjectData
};
