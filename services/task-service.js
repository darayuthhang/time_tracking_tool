const { ApiServiceMessage } = require("../constant/message");
const logger = require("../utils/error-handler")
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const {TaskRepository} = require("../database/repository/index");
const {isObjectEmpty} = require("../utils/index");
module.exports = class TaskService{
    constructor() {
        this.taskService = "TASK_SERVICE";
        this.taskRepository = new TaskRepository();
    }
    async createTasks(tasks){
        logger.debug(ApiServiceMessage(this.taskService, "createTasks"))
        try {
            return await this.taskRepository.createTasks(tasks);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Get task')
            }
        }
    }
    async createTask({ projectId, taskName, taskDate, taskDescription, taskStatus }) {
        logger.debug(ApiServiceMessage(this.taskService, "createTask"))
        try {
            return await this.taskRepository.createTask(projectId, taskName, taskDate, taskDescription, taskStatus);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Create task')
            }
        }
    }
    async deleteTask( projectId, taskId ) {
        logger.debug(ApiServiceMessage(this.taskService, "deleteTask"))
        try {
            await this.taskRepository.deleteTask(projectId, taskId);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Delete task')
            }
        }
    }
    async updateTask(projectId, taskId, requestBody = {}){
        logger.debug(ApiServiceMessage(this.taskService, "updateTask"))
        if (isObjectEmpty(requestBody)) throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Request body is empty');
    
        try {
            let taskToUpdate = {
                updated_at: new Date()
            };
            if (requestBody?.taskName) {
                taskToUpdate.task_name = requestBody.taskName;
            }
            if (requestBody?.taskDescription) {
                taskToUpdate.task_description = requestBody.taskDescription;
            }
            if (requestBody?.taskStatus) {
                taskToUpdate.task_status = requestBody.taskStatus;
            }
            if (requestBody?.taskDate) {
                taskToUpdate.task_date = requestBody.taskDate;
            }
            await this.taskRepository.updateTask(projectId, taskId, taskToUpdate);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Update task')
            }
        }
    }
    async deleteTasks(projectId, taskIds){
        logger.debug(ApiServiceMessage(this.taskService, "deleteTasks"))
        try {
            await this.taskRepository.deleteTasks(projectId, taskIds);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Delete task')
            }
        }
    }
    async getTasks(projectId){
        logger.debug(ApiServiceMessage(this.taskService, "getTasks"))
        try {
            return await this.taskRepository.getTasks(projectId);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Get tasks')
            }
        }
    }
}
