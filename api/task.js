const apiVersion = require("../constant/api_version");
const { ApiRouteMessage } = require("../constant/message");
const TaskService = require("../services/task-service");
const logger = require("../utils/error-handler");
const { validateTaskData, 
    validationTaskcodeRules } = require("./middleware/validatorTask")

module.exports = (app) => {
    const { API_VERSION } = apiVersion;
    const taskService  = new TaskService();
    /**
     * add Bulk of items
     */
    app.post(`${API_VERSION}/:projectId/tasks`, validationTaskcodeRules(), validateTaskData, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/:projectId/tasks`, "POST"))
     
        const { tasks } = req.body;
        try {
            await taskService.createTasks(tasks);
            return res.status(200).json({success:true})
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
    })
    // app.get("/api/v1/tasks", async (req, res, next) => {
    //     return res.status(200).json({success: true})
    // })
}
