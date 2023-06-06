const apiVersion = require("../constant/api_version");
const logger = require("../utils/error-handler");
module.exports = (app) => {
    const { API_VERSION } = apiVersion;

    app.post(`${API_VERSION}/:userId/phone-number/consent`, async (req, res, next) => {
        try {
            return res.status(200).json({success: true});
        } catch (error) {
            next(error);
        }
    })
    /**
     * /api/v1/userId/phone-number/consent
     */

}
