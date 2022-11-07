import { CREATE_MEMBER, DELETE_MEMBER, GET_ALL_MEMBERS, GET_CURRENT_MEMBER } from "../actions/actionTypes";

export const membersReducer = (state = { members: [], currentMember: null }, action) =>
{
    switch (action.type)
    {
        case GET_ALL_MEMBERS:
            return { ...state, members: [...action.payload.members] };

        case CREATE_MEMBER:
            state.members.push(action.payload.member)
            return { ...state, members: [...state.members] }

        case DELETE_MEMBER:
            state.members = state.members.filter(member => member._id !== action.payload.member._id)
            return { ...state, members: [...state.members] }

        case GET_CURRENT_MEMBER:
            return { ...state, currentMember: action.payload.currentMember }

        default:
            return state;
    }
}