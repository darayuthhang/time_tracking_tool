
import { TaskTypes } from "../constants/TaskTypes";
export function taskReducers(state = {
    taskRequest: false,
    taskSuccess: false,
    taskError: null 
}, action) {
    switch (action.type) {
        case TaskTypes.CREATE_TASK_REQUEST:
            return { ...state, taskRequest: true };
        case TaskTypes.CREATE_TASK_SUCCESS:
            return { ...state, taskSuccess: true, taskRequest: false };
        case TaskTypes.CREATE_TASK_ERROR:
            return { ...state, taskError: action.payload, taskRequest: false };
        default: return state;
    }
}

