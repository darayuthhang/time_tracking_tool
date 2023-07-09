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
        case ProjectTypes.RESET_STATE_PROJECT_UPDATE_SUCCESS:
            return { ...state, projectUpdateSuccess: action.payload };
        case ProjectTypes.RESET_STATE_PROJECT_UPDATE_ERROR:
            return { ...state, projectUpdateError: action.payload };
        default: return state;
    }
}

export function projectDeleteReducers(state = {
    projectDeleteRequest: false,
    projectDeleteSuccess: false,
    projectDeleteError: null
}, action) {
    switch (action.type) {
        case ProjectTypes.PROJECT_DELETE_REQUEST:
            return { ...state, projectDeleteRequest: true };
        case ProjectTypes.PROJECT_DELETE_SUCCESS:
            return { ...state, projectDeleteSuccess: true, projectDeleteRequest: false };
        case ProjectTypes.PROJECT_DELETE_ERROR:
            return { ...state, projectDeleteError: action.payload };
        case ProjectTypes.RESET_STATE_PROJECT_DELETE_SUCCESS:
            return { ...state, projectDeleteSuccess: action.payload };
        case ProjectTypes.RESET_STATE_PROJECT_DELETE_ERROR:
            return { ...state, projectDeleteError: action.payload };
        default: return state;
    }
}

export function projectListReducers(state = {
    projectListRequest: false,
    projectListSuccess: false,
    projectListError: null,
    projectListData:[],
    totalPhoneConsent:0
}, action) {
    switch (action.type) {
        case ProjectTypes.PROJECT_LISTS_REQUEST:
            return { ...state, projectListRequest: true };
        case ProjectTypes.PROJECT_LISTS_SUCCESS:
            console.log(action.payload.data);
            return { ...state, 
                projectListSuccess: true, 
                projectListRequest: false,
                projectListData: action.payload.data?.total_projects,
                totalPhoneConsent: action.payload.data?.total_consent};
        case ProjectTypes.PROJECT_LISTS_ERROR:
            return { ...state, projectListError: null };
        default: return state;
    }
}



