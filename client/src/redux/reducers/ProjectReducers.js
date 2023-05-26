import { ProjectTypes } from "../constants/ProjectTypes";


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
        case ProjectTypes.CREATE_PROJECTS_ERROR:
            return { ...state, projectError: null };
        case ProjectTypes.RESET_CREATE_PROJECT_SUCCESS:
            return { ...state, projectSuccess: false };
        default: return state;
    }
}

export function projectUpdateReducers(state = {
    projectUpdateRequest: false,
    projectUpdateSuccess: false,
    projectUpdateError: null
}, action) {
    switch (action.type) {
        case ProjectTypes.PROJECT_UPDATE_REQUEST:
            return { ...state, projectUpdateRequest: true };
        case ProjectTypes.PROJECT_UPDATE_SUCCESS:
            return { ...state, projectUpdateSuccess: true, projectUpdateRequest: false };
        case ProjectTypes.PROJECT_UPDATE_ERROR:
            return { ...state, projectUpdateError: action.payload };
        // case ProjectTypes.RESET_CREATE_PROJECT_SUCCESS:
        //     return { ...state, projectUpdateSuccess: false };
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



