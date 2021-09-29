import {AUTH_LOGOUT, AUTH_SUCCESS, GET_USER_INFO} from "../actions/actionsType";

const initState = {
    token: localStorage.getItem("token"),
    isLogin: !!localStorage.getItem("token"),
    isAdmin: false,
    user: null
}

export default function authReducer(state=initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                isLogin: !state.isLogin,
                token: action.token
            }
        case AUTH_LOGOUT: {
            return {
                ...state,
                isLogin: !state.isLogin,
                user: null,
                token: null
            }
        }
        case GET_USER_INFO:
            return {
                ...state,
                isAdmin: action.payload.isAdmin,
                user: action.payload
            }
        default:
            return state
    }
}