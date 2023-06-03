import { AuthTypes } from "../constants/AuthTypes"
export const getAuth = () => {
    return {
        type: AuthTypes.GET_AUTH,
        payload: null
    }
}   

export const setAuth = () => {
    return {
        type: AuthTypes.UPDATE_AUTH,
        payload: null
    }
}   
export const removeAuth = () => {
    return {
        type:AuthTypes.REMOVE_AUTH,
        payload:null
    }
}
