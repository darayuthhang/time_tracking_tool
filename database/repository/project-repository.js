
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

    async createProject(projectName, description){
        logger.debug(ApiRepositoryMessage(this.project, "createProject"))
        try {
            let projects = [];
            projects = await db(TABLE_PROJECTS).insert({
                description:description,
                project_name:projectName
            }).returning('*');
            if (projects.length === 0) throw new Error("Unable to Create Project");
            return projects;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create google user')
        }
    }
}
