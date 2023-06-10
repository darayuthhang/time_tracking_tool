import { ConsentTypes } from "../constants/ConsentTypes"
import axios from '../../axios/Axios';

import { API_VERSION } from '../../constant/index';
export const createPhoneConsent = (data, userId) => async (dispatch) => {
    try {
        dispatch({ type: ConsentTypes.PHONE_CONSENT_CREATE_REQUEST })
        const respondData = await axios.post(`${API_VERSION}/${userId}/phone-number/consent`, data);
        dispatch({ type: ConsentTypes.PHONE_CONSENT_CREATE_SUCCESS })
    } catch (error) {
        dispatch({ type: ConsentTypes.PHONE_CONSENT_CREATE_ERROR, payload: error.message })
    }
}
