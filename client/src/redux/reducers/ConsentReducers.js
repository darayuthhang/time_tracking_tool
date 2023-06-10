import { ConsentTypes } from "../constants/ConsentTypes";
export function createPhoneConsentReducers(state = {
    createPhoneConsentRequest: false,
    createPhoneConsentSuccess: false,
    createPhoneConsentError: null
}, action) {
    switch (action.type) {
        case ConsentTypes.PHONE_CONSENT_CREATE_REQUEST:
            return { ...state, createPhoneConsentRequest: true };
        case ConsentTypes.PHONE_CONSENT_CREATE_SUCCESS:
            return { ...state, createPhoneConsentSuccess: true, createPhoneConsentRequest: false };
        case ConsentTypes.PHONE_CONSENT_CREATE_ERROR:
            return { ...state, createPhoneConsentError: action.payload };
        default: return state;
    }
}
