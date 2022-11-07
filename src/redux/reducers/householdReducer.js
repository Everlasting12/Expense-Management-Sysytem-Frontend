import { CREATE_HOUSEHOLD, DELETE_HOUSEHOLD, GET_ALL_HOUSEHOLDS, GET_CURRENT_HOUSEHOLD, UPDATE_HOUSEHOLD } from "../actions/actionTypes";


export const householdReducer = (state = { households: [], currentHousehold: {} }, action) =>
{
    switch (action.type)
    {
        case GET_ALL_HOUSEHOLDS:
            return { ...state, households: action.payload.households };

        case GET_CURRENT_HOUSEHOLD:
            return { ...state, currentHousehold: action.payload.currentHousehold }

        case CREATE_HOUSEHOLD:
            state.households.push(action.payload.household)
            return { ...state, households: [...state.households] }

        case UPDATE_HOUSEHOLD:
            state.households = state.households.map(household =>
            {
                if (household._id === action.payload.household._id)
                {
                    household = action.payload.household
                }
                return household
            })
            return { ...state, households: [...state.households] }

        case DELETE_HOUSEHOLD:
            state.households = state.households.filter(household => household._id !== action.payload.household._id)
            return { ...state, households: [...state.households] }

        default:
            return state;
    }
}