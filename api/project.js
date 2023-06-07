const apiVersion = require("../constant/api_version");
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")

const {ProjectService} = require('../services/index');
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const { API_VERSION } = apiVersion;
const UserAuth = require('./middleware/auth')
const {
    validationProjectcodeRules,
    validateProjectData,
    validationUserIdcodeRules,
    validationUserAndProjectIdcodeRules,
    validationUserAndProjectIdProjectNamecodeRules } = require('./middleware/validatorProject');
module.exports = (app) => {
    
    const projectService = new ProjectService();
    
    /**
     * POST - CREATE /api/v1/{userId}/projects --> collection of project
     * GET  - LIST   /api/v1/{userId}/projects 
     * GET  - SINGLE /api/v1/{userId}/project/:projectId 
     * PUT  - SINGLE /api/v1/{userId}/project/:projectId 
     * DELETE - SINGLE /api/v1/{userId}/project/:projectId 
     * DELETE  - DELETE /api/v1/{userId}/projects/:projectId 
     * PUT  - UPDATE /api/v1/{userId}/projects/:projectId 
     */
    app.post(`${API_VERSION}/:userId/projects`, UserAuth, validationProjectcodeRules(), validateProjectData, async (req, res, next) => {
        logger.info(ApiRouteMessage(`${API_VERSION}/:userId/projects`, "POST"))
        const { projectName, projectDescription } = req.body;
        const {userId} = req.params;
        //user id
        try {
            let projectData = await projectService.createProject(projectName, projectDescription, userId)
            return res.status(200).json({ success: true, message: "success", data:projectData})
        } catch (error) {
            
            next(error);
        }
    })
    app.get(`${API_VERSION}/:userId/projects`, UserAuth, validationUserIdcodeRules(), validateProjectData, async (req, res, next) => {
        const {userId} = req.params;
        logger.info(ApiRouteMessage(`${API_VERSION}/:userId/projects`, "GET"))
        try {
            const project = await projectService.getProjectByUserId(userId);
            return res.status(200).json({ success: true, message: "success", data:project })
        } catch (error) {
            
            next(error);
        }
    })
    // * PUT  - SINGLE /api/v1/{userId}/project/:projectId 
    app.put(`${API_VERSION}/:userId/project/:projectId`, UserAuth, validationUserAndProjectIdProjectNamecodeRules(), validateProjectData, async (req, res, next) => {
        logger.info(ApiRouteMessage(`${API_VERSION}/:userId/project/:projectId `, "PUT"))
        try {
            await projectService.updateProject(req.params, req.body);
            return res.status(200).json({success: true})
        } catch (error) {
            
            next(error);
        }
    })
    // * Delete  - SINGLE /api/v1/{userId}/project/:projectId 
    app.delete(`${API_VERSION}/:userId/project/:projectId`, UserAuth, validationUserAndProjectIdcodeRules(), validateProjectData, async (req, res, next) => {
        logger.info(ApiRouteMessage(`${API_VERSION}/:userId/project/:projectId `, "DELETE"))
        try {
            await projectService.deleteProject(req.params);
            return res.status(200).json({ success: true })
        } catch (error) {
            
            next(error);
        }
    })
}
