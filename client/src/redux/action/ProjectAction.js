import { ProjectTypes } from '../constants/ProjectTypes';
import axios from '../../axios/Axios';
import { logError, logSuccess } from '../../uti/error-handle';

/**
 * 
 * @ProjectList GET LIST OF PROJECT
 * @CREATE PROJECT - ADD PROJECT
 * @Getproject GET SINGLE PROJECT
 * @DELETEPROJECT DELETE SINGLE PROJECT
 * 
 */
export const createProject = (projects, userId) => async (dispatch) => {
    try {
        dispatch({ type: ProjectTypes.CREATE_PROJECTS_REQUEST })
        const { data } = await axios.post(`/api/v1/${userId}/projects`, projects);
        logSuccess(data)
        dispatch({ type: ProjectTypes.CREATE_PROJECTS_SUCCESS, payload: data })
    } catch (error) {
        logError(error)
        dispatch({ type: ProjectTypes.CREATE_PROJECTS_ERROR, payload: error.message })
    }
}

export const projectList= (userId) => async (dispatch) => {
    try {
        dispatch({ type: ProjectTypes.PROJECT_LISTS_REQUEST })
        const {data} = await axios.get(`/api/v1/${userId}/projects`);
        logSuccess(data)
        dispatch({ type: ProjectTypes.PROJECT_LISTS_SUCCESS,payload:data })
    } catch (error) {
        logError(error)
        dispatch({ type: ProjectTypes.PROJECT_LISTS_ERROR, payload: error.message })
    }
}

export const resetStateCreateSuccess  = () => {
    return{
        type: ProjectTypes.RESET_CREATE_PROJECT_SUCCESS,
        payload:""
    }
}
