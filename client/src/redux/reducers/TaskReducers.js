
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

export function taskListReducers(state = {
    taskListRequest: false,
    taskListSuccess: false,
    taskListError: null,
    taskListData:[]
}, action) {
    switch (action.type) {
        case TaskTypes.GET_TASK_LIST_REQUEST:
            return { ...state, taskListRequest: true };
        case TaskTypes.GET_TASK_LIST_SUCCESS:
            return { ...state, taskListSuccess: true, taskListRequest: false, taskListData:action.payload?.data?.data };
        case TaskTypes.GET_TASK_LIST_ERROR:
            return { ...state, taskListError: action.payload, taskListRequest: false };
        default: return state;
    }
}


