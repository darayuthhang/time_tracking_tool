
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

    async createProject(projectName, description, userId){
        logger.debug(ApiRepositoryMessage(this.project, "createProject"))
        try {
            let projects = [];
            projects = await db(TABLE_PROJECTS).insert({
                description:description,
                project_name:projectName,
                user_id:userId
            });
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create Project')
        }
    }
}
