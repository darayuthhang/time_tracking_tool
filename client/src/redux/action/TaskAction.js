import { TaskTypes } from '../constants/TaskTypes';
import axios from '../../axios/Axios';
export const createTask = (data) => async (dispatch) => {
    try {
        dispatch({ type: TaskTypes.CREATE_TASKS_REQUEST })
        const createData = await axios.post(BackEndRoute.FEED_BACK, data);
        dispatch({ type: TaskTypes.CREATE_TASKS_SUCCESS })
    } catch (error) {
        dispatch({ type: TaskTypes.CREATE_TASKS_ERROR, payload: error.message })
    }
}
