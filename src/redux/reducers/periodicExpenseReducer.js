import { CREATE_PERIODIC_EXPENSE, GET_ALL_PERIODIC_EXPENSE, GET_CURRENT_PERIODIC_EXPENSE, UPDATE_PERIODIC_EXPENSE } from "../actions/actionTypes";

export const periodicExpenseReducer = (state = { periodicExpenses: [], currentPeriodicExpense: {} }, action) =>
{
    switch (action.type)
    {
        case GET_ALL_PERIODIC_EXPENSE:
            return { ...state, periodicExpenses: action.payload.periodicExpenses }

        case GET_CURRENT_PERIODIC_EXPENSE:
            return { ...state, currentPeriodicExpense: action.payload.currentPeriodicExpense }

        case CREATE_PERIODIC_EXPENSE:
            state.periodicExpenses.push(action.payload.periodicExpense)
            return { ...state, periodicExpenses: [...state.periodicExpenses] }

        case UPDATE_PERIODIC_EXPENSE:
            state.periodicExpenses = state.periodicExpenses.map(pe =>
            {
                if (pe._id === action.payload.periodicExpense._id)
                {
                    pe = action.payload.periodicExpense
                }
                return pe
            })
            return { ...state, periodicExpenses: [...state.periodicExpenses] }

        default:
            return state;
    }
}