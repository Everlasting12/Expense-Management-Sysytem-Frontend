import { GET_LOGGEDIN_USER_DETAILS, LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";



export const loginReducer = (state = { token: "", user: null }, action) =>
{
    switch (action.type)
    {
        case LOGIN_USER:

            return { ...state, token: action.payload.token };

        case GET_LOGGEDIN_USER_DETAILS:
            return { ...state, user: action.payload.loggedInUser };

        case LOGOUT_USER:
            return { token: "", user: null }

        default:
            return state;
    }
}