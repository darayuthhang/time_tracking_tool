const { ApiServiceMessage } = require("../constant/message");
const logger = require("../utils/error-handler")
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const {TaskRepository} = require("../database/repository/index");
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
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot get project')
            }
        }
    }
    async createTask({ projectId, taskName, taskDate, taskDescription }) {
        logger.debug(ApiServiceMessage(this.taskService, "createTask"))
        try {
            return await this.taskRepository.createTask(projectId, taskName, taskDate, taskDescription);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot get project')
            }
        }
    }
    
}
