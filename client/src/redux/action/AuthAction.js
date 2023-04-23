import { AuthTypes } from "../constants/AuthTypes"
export const getAuth = () => {
    return {
        type: AuthTypes.GET_AUTH,
        payload: null
    }
}   
