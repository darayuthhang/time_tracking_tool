
const { ApiServiceMessage } = require("../constant/message");
const logger = require("../utils/error-handler")
const { APIError, STATUS_CODES } = require("../utils/app-errors");

const { ProjectRepository } = require("../database/repository/index"); // {UserResponsetory : require}  ===> Userespo1.userresponse(reuire) => new

module.exports = class ProjectService{
    constructor(){
        this.projectService = "PROJECT SERVICE";
        this.projectRepository = new ProjectRepository();
    }
    async createProject(projectName, projectDescription, userId){
        logger.debug(ApiServiceMessage(this.projectService, "createProject"))
        try {
            return await this.projectRepository.createProject(projectName, projectDescription, userId);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot create Project.')
            }
        }
    }
    async getProjectByUserId(userId){
        logger.debug(ApiServiceMessage(this.projectService, "getProjectByUserId"))
        try {
            let data = await this.projectRepository.getProjectByUserId(userId);
            return data;
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot get project')
            }
        }
    }
    async updateProject({projectId, userId}, requestBody){
        logger.debug(ApiServiceMessage(this.projectService, "updateProject"))
        try {
            let projectToUpdate = {
                updated_at: new Date()
            };
            if (requestBody?.projectName) {
                projectToUpdate.project_name = requestBody.projectName;
            }
            if (requestBody?.projectDescription){
                projectToUpdate.project_description = requestBody.projectDescription;
            }
            await this.projectRepository.updateProject(userId, projectId, projectToUpdate)
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot get project')
            }
        }
    }
    async deleteProject({userId, projectId}) {
        logger.debug(ApiServiceMessage(this.projectService, "deleteProject"))
        try {
            await this.projectRepository.deleteProject(userId, projectId);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot delete project')
            }
        }
    }
}
