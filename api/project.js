const apiVersion = require("../constant/api_version");
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")
const { API_VERSION } = apiVersion;
const {ProjectService} = require('../services/index');
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const UserAuth = require('./middleware/auth')
const {
    validationProjectcodeRules,
    validateProjectData } = require('./middleware/validatorProject');
module.exports = (app) => {
    
    const projectService = new ProjectService();

    /**
     * POST - CREATE /api/v1/{userId}/projects --> collection of project
     * GET  - LIST   /api/v1/{userId}/projects 
     * GET  - SINGLE /api/v1/{userId}/projects/:projectId 
     * DELETE  - DELETE /api/v1/{userId}/projects/:projectId 
     * PUT  - UPDATE /api/v1/{userId}/projects/:projectId 
     */
    app.post(`${API_VERSION}/:userId/projects`, validationProjectcodeRules(), validateProjectData, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/projects`, "POST"))
        const { projectName, projectDescription } = req.body;
        const {userId} = req.params;
        //user id
        try {
            await projectService.createProject(projectName, projectDescription, userId)
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
