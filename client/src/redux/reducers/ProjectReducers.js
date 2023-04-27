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
        // case UserTypes.GOOGLE_LOGIN_USER_ERROR:
        //     return { ...state, projectError: action.payload, projectRequest: false };
        case ProjectTypes.CREATE_PROJECTS_ERROR:
            return { ...state, projectError: null };
        default: return state;
    }
}
