const apiVersion = require("../constant/api_version");
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")
const { API_VERSION } = apiVersion;
const {ProjectService} = require('../services/index');
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const UserAuth = require('./middleware/auth')
const {
    validationProjectcodeRules,
    validateProjectData,
    validationUserIdcodeRules } = require('./middleware/validatorProject');
module.exports = (app) => {
    
    const projectService = new ProjectService();

    /**
     * POST - CREATE /api/v1/{userId}/projects --> collection of project
     * GET  - LIST   /api/v1/{userId}/projects 
     * GET  - SINGLE /api/v1/{userId}/projects/:projectId 
     * DELETE  - DELETE /api/v1/{userId}/projects/:projectId 
     * PUT  - UPDATE /api/v1/{userId}/projects/:projectId 
     */
    app.post(`${API_VERSION}/:userId/projects`, UserAuth, validationProjectcodeRules(), validateProjectData, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/:userId/projects`, "POST"))
        const { projectName, projectDescription } = req.body;
        const {userId} = req.params;
        //user id
        try {
            await projectService.createProject(projectName, projectDescription, userId)
            // const data = await openAiService.generatePrompt(input);
            //return res.status(200).json({ success: true, data })
            return res.status(200).json({ success: true, message: "Hello World!" })
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
    })
    app.get(`${API_VERSION}/:userId/projects`, UserAuth, validationUserIdcodeRules(), validateProjectData, async (req, res, next) => {
        const {userId} = req.params;
        logger.debug(ApiRouteMessage(`${API_VERSION}/:userId/projects`, "GET"))
        try {
            const project = await projectService.getProjectByUserId(userId);
            return res.status(200).json({ success: true, message: "Hello World!", data:project })
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
       
    })
}
