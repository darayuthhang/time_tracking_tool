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
