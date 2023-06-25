
import { UserTypes } from "../constants/UserTypes";
import BackEndPoint from "../../constant/BackEndPoint";
import axios from '../../axios/Axios';
import Cookie from "../../uti/Cookie";
import { logError, logSuccess } from "../../uti/error-handle";
import { getAuth } from "./AuthAction";

export const signup = (firstName, lastName, email, password) => async (dispatch) => {

    try {
        dispatch({ type: UserTypes.SIGN_UP_USER_REQUEST });
        const { data } = await axios.post(BackEndPoint.SIGN_UP, { firstName, lastName, email, password });
        Cookie.saveUser(data?.data);
        Cookie.saveEmail(email);
        dispatch({ type: UserTypes.SIGN_UP_USER_SUCCESS, payload: email });
    } catch (error) {
        logError(error, error.message)
        //please actiavte user account
        if (error?.response?.status === 400) Cookie.saveEmail(email);
        dispatch({ type: UserTypes.SIGN_UP_USER_ERROR, payload: error?.response?.status });
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: UserTypes.LOGIN_USER_REQUEST });
        const { data } = await axios.post(BackEndPoint.LOGIN, {email, password });
        logSuccess(data);
        Cookie.saveUser(data?.data);
        dispatch(getAuth())
        dispatch({ type: UserTypes.LOGIN_USER_SUCCESS, payload: data });
    } catch (error) {
        logError(error, error.message)
        dispatch({ type: UserTypes.LOGIN_USER_ERROR, payload: error?.response?.status });
    }
}
export const googleLogin = (accessToken, signUpOrLogin) => async (dispatch) => {
    console.log(signUpOrLogin);
    try {
        dispatch({ type: UserTypes.GOOGLE_LOGIN_USER_REQUEST });
        const { data } = await axios.post(BackEndPoint.GOOGLE_LOGIN, { googleToken: accessToken, signUpOrLogin: signUpOrLogin });
        logSuccess(data);
        Cookie.saveUser(data?.data);
        dispatch(getAuth())
        dispatch({ type: UserTypes.GOOGLE_LOGIN_USER_SUCCESS, payload: data });
    } catch (error) {
        logError(error, error.message)
        dispatch({ type: UserTypes.GOOGLE_LOGIN_USER_ERROR, payload: error?.response?.status });
    }
}

export const resetLoginError = () => {
    return{
        type:UserTypes.RESET_LOGIN_USER_ERROR
    }
}

export const resetSignupError = () => {
    return {
        type: UserTypes.RESET_SIGN_UP_USER_ERROR
    }
}
export const resetGoogleLoginError = () => {
    return {
        type: UserTypes.GOOGLE_RESET_LOGIN_USER_ERROR
    }
}
export const resetSignupSuccess = () => {
    return {
        type: UserTypes.RESET_SIGN_UP_USER_SUCCESS
    }
}
export const resetGoogleSignupSuccess = () => {
    return {
        type: UserTypes.RESET_GOOGLE_SIGN_UP_USER_SUCCESS
    }
}
