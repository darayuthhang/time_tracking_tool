const apiVersion = require("../constant/api_version");
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")
const { API_VERSION } = apiVersion;
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const UserAuth = require('./middleware/auth')
module.exports = (app) => {

    /**
     * POST - CREATE /api/v1/projects --> collection of project
     * GET  - LIST   /api/v1/projects
     * GET  - SINGLE /api/v1/projects/:id
     * DELETE  - DELETE /api/v1/projects
     * PUT  - UPDATE /api/v1/projects/:id
     */
    app.post(`${API_VERSION}/projects`, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/projects`, "POST"))
        const { projectName, description } = req.body;

        try {
     
            // const data = await openAiService.generatePrompt(input);
            //return res.status(200).json({ success: true, data })
            return res.status(200).json({success: true, message:"success"});
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
    })
    app.get(`${API_VERSION}/projects`, async (req, res, next) => {
        return res.status(404).json({ success: true, message:"Hello World!" })
    })
}
