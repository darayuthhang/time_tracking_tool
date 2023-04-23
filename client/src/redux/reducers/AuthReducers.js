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
        default: return state;
    }
}

