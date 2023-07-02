
const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const { ApiRepositoryMessage } = require('../../constant/message');
const { TABLE_PROJECTS, TABLE_TASKS, TABLE_USERS } = require("../table-name");


module.exports = class ProjectRepository {
    constructor() {
        this.project = "PROJECT-REPOSITORY"
    }

    async createProject(projectName, projectDescription, userId) {
        logger.info(ApiRepositoryMessage(this.project, "createProject"))
        try {
            let projects = [];
            projects = await db(TABLE_PROJECTS).insert({
                project_description: projectDescription,
                project_name: projectName,
                user_id: userId
            });
            return projects;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to CREATE project:${error.message}`)
        }
    }
    async getProjectByUserId(userId) {
        /**
         * knex('users')
  .join('contacts', 'users.id', '=', 'contacts.user_id')
  .select('users.id', 'contacts.phone')
         */
        logger.info(ApiRepositoryMessage(this.project, "getProjectByUserId"))
        try {
            // const projects = await db(TABLE_PROJECTS)
            // .join(`${TABLE_USERS}`, `${TABLE_USERS}.id`, `${TABLE_PROJECTS}.user_id`)
            // .select(`${TABLE_PROJECTS}.*`, `${TABLE_USERS}.account_type`)
            // .where(
            //     {
            //         user_id: userId
            //     }
            // )
            const projects = await db(TABLE_PROJECTS)
            .select('*')
            .where({ user_id: userId})
            .orderBy('created_at', 'asc')
            return projects;
        } catch (error) {
             throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to GET project:${error.message}`)
        }
    }
    async updateProject(userId, projectId, project) {
        logger.info(ApiRepositoryMessage(this.project, "updateProject"))
        try {
            return await db(TABLE_PROJECTS)
                .update(project)
                .where({
                    user_id: userId,
                    id: projectId
                })
                
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to Update project:${error.message}`)
        }
    }
    async deleteProject(userId, projectId) {
        logger.info(ApiRepositoryMessage(this.project, "deleteProject"))
        /**
         * Delete task first
         */
        try {
            await db(TABLE_TASKS)
                .where({
                    project_id:projectId
                })
                .del()
            await db(TABLE_PROJECTS)
                .where({
                    user_id: userId,
                    id: projectId
                })
                .del()
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to Delete project:${error.message}`)
        }
    }
}
