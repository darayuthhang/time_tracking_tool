import { TaskTypes } from '../constants/TaskTypes';
import axios from '../../axios/Axios';
import { logError, logSuccess } from '../../uti/error-handle';
export const createTask = (data, projectId) => async (dispatch) => {
    try {
        dispatch({ type: TaskTypes.CREATE_TASK_REQUEST })
        const createData = await axios.post(`/api/v1/${projectId}/task`, data);
        logSuccess(createData);
        dispatch({ type: TaskTypes.CREATE_TASK_SUCCESS })
    } catch (error) {
        logError(error)
        dispatch({ type: TaskTypes.CREATE_TASK_ERROR, payload: error.message })
    }
}
export const resetTaskSuccess = () => {
    return {
        type: TaskTypes.RESET_TASK_SUCCESS
    }
}

export const getTaskList = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: TaskTypes.GET_TASK_LIST_REQUEST })
        const getListData = await axios.get(`/api/v1/${projectId}/tasks`);
        logSuccess(getListData);
        dispatch({ type: TaskTypes.GET_TASK_LIST_SUCCESS, payload:getListData })
    } catch (error) {
        logError(error)
        dispatch({ type: TaskTypes.GET_TASK_LIST_ERROR, payload: error.message })
    }
}

export const deleteTaskList = (projectId, taskIds = []) => async(dispatch) => {
    try {
        // console.log(JSON.stringify(taskIds));
        dispatch({ type: TaskTypes.TASKS_LIST_DELETE_REQUEST })
        const listData = await axios.post(`/api/v1/${projectId}/tasks/bulk/delete`, { taskIds: JSON.stringify(taskIds) });
        logSuccess(listData);
        dispatch({ type: TaskTypes.TASKS_LIST_DELETE_SUCCESS })
    } catch (error) {
        logError(error)
        dispatch({ type: TaskTypes.TASKS_LIST_DELETE_ERROR, payload: error.message })
    }
}
export const updateTask = (projectId, taskId, task) => async (dispatch) => {
    try {
        // console.log(JSON.stringify(taskIds));
        dispatch({ type: TaskTypes.TASK_UPDATE_REQUEST })
        const getData = await axios.put(`/api/v1/${projectId}/task/${taskId}`, task);
        logSuccess(getData);
        dispatch({ type: TaskTypes.TASK_UPDATE_SUCCESS })
    } catch (error) {
        logError(error)
        dispatch({ type: TaskTypes.TASK_UPDATE_ERROR_REQUEST, payload: error.message })
    }
}


export const updateTaskListState = (data) => {
    return {
        type: TaskTypes.UPDATE_TASKS_LIST_STATE,
        payload:data
    }
}
export const resetTaskListSuccess = () => {
    return {
        type: TaskTypes.TASK_LIST_RESET_SUCCESS
    }
}

