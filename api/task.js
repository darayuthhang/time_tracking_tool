const apiVersion = require("../constant/api_version");
const { ApiRouteMessage } = require("../constant/message");
const TaskService = require("../services/task-service");
const logger = require("../utils/error-handler");
const { 
    validateTaskData, 
    validationTaskscodeRules,
    validationTaskcodeRules,
    validationProjectIdTaskcodeRules } = require("./middleware/validatorTask")
const UserAuth = require('./middleware/auth')
module.exports = (app) => {
    /**
   * POST - CREATE SINGLE /api/v1/{projectId}/task
   * GET  - LIST   /api/v1/{projectId}/tasks 
   * GET  - SINGLE /api/v1/{projectId}/task
   * DELETE  - DELETE /api/v1/{projectId}
   * PUT  - UPDATE /api/v1/{projectId}/task 
   */
    const { API_VERSION } = apiVersion;
    const taskService  = new TaskService();
    /**
     * add Bulk of items
     */
    // app.post(`${API_VERSION}/:projectId/tasks`, validationTaskscodeRules(), validateTaskData, async (req, res, next) => {
    //     logger.debug(ApiRouteMessage(`${API_VERSION}/:projectId/tasks`, "POST"))
     
    //     const { tasks } = req.body;
    //     try {
    //         await taskService.createTasks(tasks);
    //         return res.status(200).json({success:true})
    //     } catch (error) {
    //         logger.debug(error.message)
    //         next(error);
    //     }
    // })
    /**
     * Add single item
     */
    app.post(`${API_VERSION}/:projectId/task`, UserAuth, validationTaskcodeRules(), validateTaskData,  async (req, res, next) => {
        try {
            await taskService.createTask(req.body);
            return res.status(200).json({ success: true })
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
  
    })
    app.get(`${API_VERSION}/:projectId/tasks`, validationProjectIdTaskcodeRules(), validateTaskData, async (req, res, next) => {
        const {projectId} = req.params;
        try {
            let data = await taskService.getTasks(projectId);
            return res.status(200).json({ success: true, data })
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
    })
    // app.post(`${API_VERSION}/:projectId/tasks`)
    // app.get("/api/v1/tasks", async (req, res, next) => {
    //     return res.status(200).json({success: true})
    // })
}
