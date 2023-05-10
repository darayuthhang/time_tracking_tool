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
