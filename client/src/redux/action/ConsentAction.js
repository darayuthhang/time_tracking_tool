import { ConsentTypes } from "../constants/ConsentTypes"
import axios from '../../axios/Axios';

import { API_VERSION } from '../../constant/index';
export const createPhoneConsent = (projects, userId) => async (dispatch) => {
    try {
        dispatch({ type: ConsentTypes.PHONE_CONSENT_CREATE_REQUEST })
        const { data } = await axios.post(`${API_VERSION}/${userId}/projects`, projects);
        dispatch({ type: ConsentTypes.PHONE_CONSENT_CREATE_SUCCESS })
    } catch (error) {
        dispatch({ type: ConsentTypes.PHONE_CONSENT_CREATE_ERROR, payload: error.message })
    }
}
