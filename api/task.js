const apiVersion = require("../constant/api_version");
const { ApiRouteMessage } = require("../constant/message");
const TaskService = require("../services/task-service");
const logger = require("../utils/error-handler");
const {isObjectEmpty} = require('../utils/index');
const { 
    validateTaskData, 
    validationTaskscodeRules,
    validationTaskcodeRules,
    validationProjectIdTaskcodeRules,
    validationDeleteProjectTaskcodeRules,
    validationProjectIdAndTaskscodeRules,
    validationUpdateProjectTaskcodeRules } = require("./middleware/validatorTask")
const UserAuth = require('./middleware/auth')
module.exports = (app, cache) => {
    /**
   * POST - CREATE SINGLE /api/v1/{projectId}/task
   * GET  - LIST   /api/v1/{projectId}/tasks 
   * GET  - SINGLE /api/v1/{projectId}/task
   * DELETE  - DELETE /api/v1/{projectId}/task/:collection
   * PUT  - UPDATE /api/v1/{projectId}/task/:taskId 
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
    //     logger.info(ApiRouteMessage(`${API_VERSION}/:projectId/tasks`, "POST"))
     
    //     const { tasks } = req.body;
    //     try {
    //         await taskService.createTasks(tasks);
    //         return res.status(200).json({success:true})
    //     } catch (error) {
    //     
    //         next(error);
    //     }
    // })
    const delCache = (id)=> {
        cache.del(id);
    }
    /**
     * Add single item
     */
    app.post(PROJECT_TASK_ROUTE, UserAuth, validationTaskcodeRules(), validateTaskData,  async (req, res, next) => {
        logger.info(ApiRouteMessage(`${PROJECT_TASKS_ROUTE}`, "Create task"));
        try {
            const { projectId } = req.params;
            await taskService.createTask(req.body);
            delCache(projectId)
            return res.status(200).json({ success: true })
        } catch (error) {
            next(error);
        }
    })
    /**
     * Put single item
     */
    app.put(`${PROJECT_TASK_ROUTE}/:taskId`, 
        UserAuth, 
        validationUpdateProjectTaskcodeRules(), 
        validateTaskData, 
        async (req, res, next) => {
            logger.info(ApiRouteMessage(`${PROJECT_TASKS_ROUTE}`, "Update task"));
            const {projectId, taskId} = req.params;
            try {
                if (isObjectEmpty(req.body))throw new Error("Request body is empty.")
                await taskService.updateTask(projectId, taskId, req.body);
                delCache(projectId);
                return res.status(200).json({ success: true })
            } catch (error) {
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
    //     
    //         next(error);
    //     }
    // })
    /**
     * Delete List of Items
     * @never send request body in delete route
     */
    app.post(`${PROJECT_TASKS_ROUTE}/bulk/delete`, UserAuth,
        validationProjectIdAndTaskscodeRules(), 
        validateTaskData, 
        async (req, res, next) => {
        
        logger.info(ApiRouteMessage(`${PROJECT_TASKS_ROUTE}/bulk/delete`, "Delete in Bluk"))
        const { projectId } = req.params;
        const {taskIds} = req.body;
        /**
         * if i need to delete project ,
         * Delete task first and then delete project (befcause if we need to delete s3 files in the future)
         * we do not use cascade or any soft delete since database already back ups
         * 
         */
        try {
            /**
             * Ifdatabase operations can be time-consuming or prone to errors, 
             * invalidating the cache first and then deleting 
             * the item from the database can provide a better 
             * user experience by serving valid data from the cache
             *  while the database operation is underway.
             */
           
            await taskService.deleteTasks(projectId, JSON.parse(taskIds));
            delCache(projectId)
            return res.status(200).json({ success: true })
        } catch (error) {
            next(error);
        }
    })
    /**
     * Get List of Item
     */
    app.get(PROJECT_TASKS_ROUTE, UserAuth, validationProjectIdTaskcodeRules(), validateTaskData, async (req, res, next) => {
        logger.info(ApiRouteMessage(`${PROJECT_TASKS_ROUTE}`, "Get tasks"));
        const { projectId } = req.params;
        try {
            let data = null;
            // if(cache.has(projectId)){
            //     data = cache.get(projectId);
            // }else{
                data = await taskService.getTasks(projectId);
                // if(data.length > 0) cache.set(projectId, data);
            //}
            return res.status(200).json({ success: true, data })
        } catch (error) {
            next(error);
        }
    })
   

}
