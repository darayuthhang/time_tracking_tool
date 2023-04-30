import { ProjectTypes } from "../constants/ProjectTypes";

/**
 * 
 * @DESCRIPIOTN
 * 
 * For example, 
 * both reducers might be dealing with projects,
 *  but projectReducers might be responsible for creating, 
 * updating, and deleting individual projects, 
 * while projectListReducers 
 * might be responsible for fetching a list of projects. 
 * In this case, the data being managed 
 * by each reducer is related to projects, 
 * but they have different responsibilities 
 * and manage different types of data.

    @HERE TO SPLIT
    SPLIT, LIST FROM SINGLE

    PROJECT SINGLE CONTAIN IT OWN METHOD ==> DELETE, GET, PUT, POST
    PROJECT LIST CONTAIN IT OWN METHOD ===> DELETE, GET, PUT, POST
    if it is list split --> DELETE, GET, PUT, POST

    if it is SINGLE s
 */
export function projectReducers(state = {
    projectRequest: false,
    projectSuccess: false,
    projectError: null
}, action) {
    switch (action.type) {
        case ProjectTypes.CREATE_PROJECTS_REQUEST:
            return { ...state, projectRequest: true };
        case ProjectTypes.CREATE_PROJECTS_SUCCESS:
            return { ...state, projectSuccess: true, projectRequest: false };
        // case UserTypes.GOOGLE_LOGIN_USER_ERROR:
        //     return { ...state, projectError: action.payload, projectRequest: false };
        case ProjectTypes.CREATE_PROJECTS_ERROR:
            return { ...state, projectError: null };
        case ProjectTypes.RESET_CREATE_PROJECT_SUCCESS:
            return { ...state, projectSuccess: false };
        default: return state;
    }
}


export function projectListReducers(state = {
    projectListRequest: false,
    projectListSuccess: false,
    projectListError: null,
    projectListData:[]
}, action) {
    switch (action.type) {
        case ProjectTypes.PROJECT_LISTS_REQUEST:
            return { ...state, projectListRequest: true };
        case ProjectTypes.PROJECT_LISTS_SUCCESS:
            return { ...state, 
                projectListSuccess: true, 
                projectListRequest: false,
                projectListData: action.payload.data  };
        case ProjectTypes.PROJECT_LISTS_ERROR:
            return { ...state, projectListError: null };
        default: return state;
    }
}



