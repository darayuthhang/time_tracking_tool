import { AuthTypes } from "../constants/AuthTypes";
import Cookie from "../../uti/Cookie";

export function authReducers(state = {
    isAuth: Cookie.getUser()?.accessToken ? true : false,
    user: Cookie.getUser()
}, action) {
    switch (action.type) {
        case AuthTypes.GET_AUTH:
            return {
                ...state,
                isAuth: Cookie.getUser()?.accessToken ? true : false,
                user: Cookie.getUser()
            };
        case AuthTypes.UPDATE_AUTH:
            return {
                ...state,
                user: Cookie.getUser()
            };
        case AuthTypes.REMOVE_AUTH:
            return {
                ...state,
                isAuth:false,
                user: Cookie.removeUser()
            };
        
        default: return state;
    }
}

