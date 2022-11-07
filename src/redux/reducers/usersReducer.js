import * as actions from "../actions/actionTypes"

export const usersReducer = (state = { users: [], currentUser: null, usersOfRoleMember: [] }, action) =>
{
    switch (action.type)
    {
        case actions.GET_CURRENT_USER:
            return { ...state, currentUser: action.payload.currentUser }

        case actions.GET_ALL_USERS:
            return { ...state, users: action.payload.users }

        case actions.CREATE_USER:
            state.users.push(action.payload.user)
            return { ...state, users: [...state.users] }

        case actions.UPDATE_USER:
            state.users = state.users.map(user =>
            {
                if (user._id === action.payload.user._id)
                {
                    user = action.payload.user
                }
                return user
            })
            return { ...state, users: [...state.users] }

        case actions.DELETE_USER:
            console.log(action.payload.user._id)
            state.users = state.users.filter(user => user._id !== action.payload.user._id)
            return { ...state, users: [...state.users] }



        case actions.GET_ALL_USERS_OF_MEMBER_ROLE:
            return { ...state, usersOfRoleMember: action.payload.usersOfRoleMember }


        default:
            return state;
    }
}
