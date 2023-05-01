
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
            taskData = await db(TABLE_TASKS).insert(tasks);
            console.log(taskData);
            return taskData;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create task')
        }
    }
}
