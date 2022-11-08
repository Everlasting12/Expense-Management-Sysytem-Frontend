

import axios from "axios";
import
{
    GET_ALL_DAILY_EXPENSE,
    CREATE_DAILY_EXPENSE,
    DELETE_DAILY_EXPENSE,
    UPDATE_DAILY_EXPENSE, GET_SPECIFIC_DAILY_EXPENSE,
    GET_CURRENT_DAILY_EXPENSE
} from "./actionTypes";
const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "api/householdexpenses/"


export const getAllDailyExpenses = () => (dispatch) =>
{
    axios.get(apiEndpoint)
        .then(response => dispatch({
            type: GET_ALL_DAILY_EXPENSE,
            payload: { dailyExpenses: response.data.data }
        }))
        .catch(error => console.log(error))
}

export const addDailyExpenses = (data) => (dispatch, getState) =>
{
    toast.promise(axios.post(apiEndpoint, data, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }), {
        pending: "Adding Daily Expense.",
        success: "Daily Expense added successfully!"
    }).then(response => dispatch({
        type: CREATE_DAILY_EXPENSE,
        payload: { dailyExpense: response.data }
    })).catch(error => console.log(error))
}
