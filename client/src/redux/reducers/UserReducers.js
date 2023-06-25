

import { UserTypes } from "../constants/UserTypes";
import Cookie from "../../uti/Cookie";
export function userSignUpReducers(state = {
    signUpRequest:false,
    signUpSuccess:false,
    signUpError:null,
    //userId: Cookies.get("userId"), //this is to prevent user from losing data when user refresh
    email: Cookie.getEmail()
}, action) {
    switch (action.type) {
        case UserTypes.SIGN_UP_USER_REQUEST:
            return {...state, signUpRequest:true};
        case UserTypes.RESET_SIGN_UP_USER_ERROR:
            return { ...state, signUpError: null };
        case UserTypes.RESET_SIGN_UP_USER_SUCCESS:
            return { ...state, signUpSuccess: false, signUpError:null};
        case UserTypes.SIGN_UP_USER_SUCCESS:
            //Cookies.set("userId", action.payload?.data?.userId, { expires: 1})
            return { ...state, signUpSuccess: true, signUpRequest: false, email: Cookie.getEmail() };
        case UserTypes.SIGN_UP_USER_ERROR:
            return { ...state, signUpRequest: false, signUpError:action.payload };
        default: return state;
    }
}

export function userLoginReducers(state = {
    loginRequest: false,
    loginSuccess: false,
    loginError: null,

}, action){
    switch (action.type) {
        case UserTypes.LOGIN_USER_REQUEST:
            return { ...state, loginRequest: true };
        case UserTypes.LOGIN_USER_SUCCESS:
            return { ...state, loginSuccess: true, loginRequest: false };
        case UserTypes.LOGIN_USER_ERROR:
            return { ...state, loginError: action.payload, loginRequest:false};
        case UserTypes.RESET_LOGIN_USER_ERROR:
            return { ...state, loginError: null };
        default: return state;
    }
}

export function googleUserLoginReducers(state = {
    googleLoginRequest: false,
    googleLoginSuccess: false,
    googleLoginError: null
}, action) {
    switch (action.type) {
        case UserTypes.GOOGLE_LOGIN_USER_REQUEST:
            return { ...state, googleLoginRequest: true };
        case UserTypes.RESET_GOOGLE_SIGN_UP_USER_SUCCESS:
            return { ...state, googleLoginSuccess: false, googleLoginError:null };
        case UserTypes.GOOGLE_LOGIN_USER_SUCCESS:
            return { ...state, googleLoginSuccess: true, googleLoginRequest: false };
        case UserTypes.GOOGLE_LOGIN_USER_ERROR:
            return { ...state, googleLoginError: action.payload, googleLoginRequest: false };
        case UserTypes.GOOGLE_RESET_LOGIN_USER_ERROR:
            return { ...state, googleLoginError: null };
        default: return state;
    }
}
