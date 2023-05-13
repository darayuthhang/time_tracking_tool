const apiVersion = require("../constant/api_version");
const { ApiRouteMessage } = require("../constant/message");
const TaskService = require("../services/task-service");
const logger = require("../utils/error-handler");
const { 
    validateTaskData, 
    validationTaskscodeRules,
    validationTaskcodeRules,
    validationProjectIdTaskcodeRules,
    validationDeleteProjectTaskcodeRules,
    validationProjectIdAndTaskscodeRules } = require("./middleware/validatorTask")
const UserAuth = require('./middleware/auth')
module.exports = (app) => {
    /**
   * POST - CREATE SINGLE /api/v1/{projectId}/task
   * GET  - LIST   /api/v1/{projectId}/tasks 
   * GET  - SINGLE /api/v1/{projectId}/task
   * DELETE  - DELETE /api/v1/{projectId}/task/:collection
   * PUT  - UPDATE /api/v1/{projectId}/task 
   * 
   * DELETE SINGLE ITEM  - DELETE /api/v1/{projectId}/task/:taskId
   */
    const { API_VERSION } = apiVersion;
    const taskService  = new TaskService();

    const PROJECT_TASK_ROUTE = `${API_VERSION}/:projectId/task`
    const PROJECT_TASKS_ROUTE = `${API_VERSION}/:projectId/tasks`
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
    app.post(PROJECT_TASK_ROUTE, UserAuth, validationTaskcodeRules(), validateTaskData,  async (req, res, next) => {
        try {
            await taskService.createTask(req.body);
            return res.status(200).json({ success: true })
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
    })
    /**
     * Delete single item
     */
    // app.delete(`${PROJECT_TASK_ROUTE}/:taskId`, UserAuth, validationDeleteProjectTaskcodeRules(), validateTaskData ,async (req, res, next) => {
    //     const { projectId, taskId} = req.params;
    //     /**
    //      * if i need to delete project ,
    //      * Delete task first and then delete project (befcause if we need to delete s3 files in the future)
    //      * we do not use cascade or any soft delete since database already back ups
    //      * 
    //      */
    //     try {
    //         await taskService.deleteTask(projectId, taskId);
    //         return res.status(200).json({ success: true })
    //     } catch (error) {
    //         logger.debug(error.message)
    //         next(error);
    //     }
    // })
    /**
     * Delete List of Items
     * @never send request body in delete route
     */
    app.delete(`${PROJECT_TASKS_ROUTE}/:taskIds`, UserAuth,
        validationProjectIdAndTaskscodeRules(), 
        validateTaskData, 
        async (req, res, next) => {
   
        const { projectId, taskIds } = req.params;
        
        /**
         * if i need to delete project ,
         * Delete task first and then delete project (befcause if we need to delete s3 files in the future)
         * we do not use cascade or any soft delete since database already back ups
         * 
         */
        try {
            await taskService.deleteTasks(projectId, JSON.parse(taskIds));
            return res.status(200).json({ success: true })
        } catch (error) {
            logger.debug(error.message)
            next(error);
        }
    })
    /**
     * Get List of Item
     */
    app.get(PROJECT_TASKS_ROUTE, UserAuth, validationProjectIdTaskcodeRules(), validateTaskData, async (req, res, next) => {
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
