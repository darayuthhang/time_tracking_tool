
const logger = require("./error-handler");
const ErrorHandler = (error, req, res, next) => {
 
    if(!error.statusCode) error.statusCode = 400;
    /**
     * @description
     *  - nested status code from repo --> service --> api
     */
    else if (error?.statusCode?.statusCode) error.statusCode = 500;
    logger.error(error.message);
    return res.status(error?.statusCode ).json({ success: false, message: "An error occurred while processing your request." })
}
module.exports = {
    MidError:ErrorHandler
}
