
import * as actions from "../actions/actionTypes"

export const expenseTypesReducer = (state = { expenseTypes: [], currentExpenseType: {} }, action) =>
{
    switch (action.type)
    {

        case actions.GET_CURRENT_EXPENSE_TYPE:
            return { ...state, currentExpenseType: action.payload.currentExpenseType }

        case actions.GET_ALL_EXPSENSE_TYPES:

            return { ...state, expenseTypes: action.payload.expenseTypes }


        case actions.CREATE_EXPSENSE_TYPES:
            state.expenseTypes.push(action.payload.expenseType)
            return { ...state, expenseTypes: state.expenseTypes }


        case actions.DELETE_EXPSENSE_TYPES:
            state.expenseTypes = state.expenseTypes.filter(e => e._id !== action.payload.expenseType._id)
            return { ...state, expenseTypes: [...state.expenseTypes] }

        default:
            return state;
    }
}

