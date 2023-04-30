
const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const { ApiRepositoryMessage } = require('../../constant/message');


const TABLE_PROJECTS = "projects";
module.exports = class ProjectRepository{
    constructor(){
        this.project = "PROJECT-REPOSITORY"
    }

    async createProject(projectName, projectDescription, userId){
        logger.debug(ApiRepositoryMessage(this.project, "createProject"))
        try {
            let projects = [];
            projects = await db(TABLE_PROJECTS).insert({
                project_description: projectDescription,
                project_name:projectName,
                user_id:userId
            });
            console.log(projects);
            return projects;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create Project')
        }
    }
    async getProjectByUserId( userId) {
        logger.debug(ApiRepositoryMessage(this.project, "getProjectByUserId"))
        try {
            const projects = await db(TABLE_PROJECTS).where(
                {
                  user_id:userId
                }
            );
            return projects;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
        }
    }
}
