
const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const { ApiRepositoryMessage } = require('../../constant/message');

const TABLE_TASKS = "tasks";
module.exports = class TaskRepository{
    constructor(){
        this.TaskRepository = "TASK_REPOSITORY"
    }
    async createTasks(tasks) {
        logger.debug(ApiRepositoryMessage(this.TaskRepository, "createTasks"))
        try {
            let taskData = [];
            taskData = await db(TABLE_TASKS).insert(tasks);;
            return taskData;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create tasks')
        }
    }
    async createTask(projectId, taskName, taskDate, taskDescription, taskStatus){
        logger.debug(ApiRepositoryMessage(this.TaskRepository, "createTask"))
        try {
            return await db(TABLE_TASKS).insert({
                project_id:projectId,
                task_name:taskName,
                task_date:taskDate,
                task_status: taskStatus,
                task_description:taskDescription,
                created_at:new Date()
            })
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create task')
        }
    }
    async deleteTask(projectId, taskId){
        logger.debug(ApiRepositoryMessage(this.TaskRepository, "deleteTask"))
        try {
            return await db(TABLE_TASKS).where({
                id: taskId,
                project_id:projectId
            }).del()
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Delete task')
        }
    }
    async updateTask(projectId, taskId, tasks) {
   
        logger.debug(ApiRepositoryMessage(this.TaskRepository, "updateTask"))
        try {
            return await db(TABLE_TASKS)
            .update(tasks)
            .where({
                id: taskId,
                project_id: projectId
            })
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Update task')
        }
    }
    async deleteTasks(projectId, taskIds) {
        logger.debug(ApiRepositoryMessage(this.TaskRepository, "deleteTask"))
        try {
            return await db(TABLE_TASKS)
            .where('project_id', projectId)
            .whereIn('id', taskIds).del()
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Delete task')
        }
    }
    async getTasks(projectId){
        logger.debug(ApiRepositoryMessage(this.TaskRepository, "getTasks"))
        try {
            // return await db(TABLE_TASKS).where("project_id", projectId)
            return await db(TABLE_TASKS)
                .select(db.raw("to_char(task_date, 'mm/dd/yyyy') as task_date, id, task_name, task_description, task_status, project_id"))
            .where("project_id", projectId)
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Get tasks')
        }
    }
    // async createTask({proje})
}
