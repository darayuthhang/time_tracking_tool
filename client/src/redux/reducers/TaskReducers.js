
import { TaskTypes } from "../constants/TaskTypes";
export function taskReducers(state = {
    
}, action) {
    switch (action.type) {
        case TaskTypes.CREATE_TASKS_SUCCESS:
            return state;
        case TaskTypes.CREATE_TASKS_REQUEST:
            return state;
        case TaskTypes.CREATE_TASKS_ERROR:
            return state
        default: return state;
    }
}

