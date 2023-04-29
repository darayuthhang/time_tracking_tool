import { ProjectTypes } from '../constants/ProjectTypes';
import axios from '../../axios/Axios';

export const createProject = (data, userId) => async (dispatch) => {
    try {
        dispatch({ type: ProjectTypes.CREATE_PROJECTS_REQUEST })
        const createData = await axios.post(`/api/v1/${userId}/projects`, data);
        dispatch({ type: ProjectTypes.CREATE_PROJECTS_SUCCESS })
    } catch (error) {
        dispatch({ type: ProjectTypes.CREATE_PROJECTS_ERROR, payload: error.message })
    }
}
