const apiVersion = require("../constant/api_version");
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")
const { validationPhoneNumberConsentRules, validatePhoneNumberConsentData } = require("./middleware/validatorConsent");
const { ConsentService } = require("../services/index");
module.exports = (app) => {
    const { API_VERSION } = apiVersion;
    const consentService = new ConsentService();
    /**
     * Log, Introduction to API
     * and error of API
     * we do not need to log in repo or service. That's it.
     * 
     * status error of validator input is 422
     * status error of middelware next error is 400.
     * s
     */
    app.post(
        `${API_VERSION}/:userId/phone-number/consent`, 
        validationPhoneNumberConsentRules(),  
        validatePhoneNumberConsentData,
        async (req, res, next) => {

        logger.info(ApiRouteMessage(`${API_VERSION}/:userId/phone-number/consent`, "POST"))
        try {
            await consentService.createPhoneNumberConsent(req.body);
            return res.status(200).json({success: true, message:"create successfully"});
        } catch (error) {
            next(error);
        }
    })
    /**
     * /api/v1/userId/phone-number/consent
     */

}
