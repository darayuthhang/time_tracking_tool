
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
        logger.debug(ApiServiceMessage(this.userService, "createUser"))
        try {
            await this.projectRepository.createProject(projectName, projectDescription, userId);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot verify User.')
            }
        }
    }
}
