import
{
    GET_ALL_DAILY_EXPENSE,
    CREATE_DAILY_EXPENSE,
    DELETE_DAILY_EXPENSE,
    UPDATE_DAILY_EXPENSE,
    GET_CURRENT_DAILY_EXPENSE,
    GET_SPECIFIC_DAILY_EXPENSE
} from "../actions/actionTypes";

export const dailyExpenseReducer = (state = { dailyExpenses: [], specificDailyExpenses: [], currentDailyExpense: {} }, action) =>
{
    switch (action.type)
    {
        case GET_ALL_DAILY_EXPENSE:
            return { ...state, dailyExpenses: action.payload.dailyExpenses };

        case GET_SPECIFIC_DAILY_EXPENSE:
            return state;

        case CREATE_DAILY_EXPENSE:
            state.dailyExpenses.push(action.payload.dailyExpense)
            return { ...state, dailyExpenses: [...state.dailyExpenses] };

        // case DELETE_DAILY_EXPENSE:
        //     return state;
        // case UPDATE_DAILY_EXPENSE:
        //     return state;
        case GET_CURRENT_DAILY_EXPENSE:
            return state;

        default:
            return state;
    }
}