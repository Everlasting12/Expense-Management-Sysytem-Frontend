import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_PERIODIC_EXPENSE, GET_ALL_PERIODIC_EXPENSE, GET_CURRENT_PERIODIC_EXPENSE, UPDATE_PERIODIC_EXPENSE } from "./actionTypes";

const periodicExpenseUpdated = (msg) => toast.success(msg, {
    theme: "light",
})

const apiEndPoint = process.env.REACT_APP_API_URL_FEATHERS + "api/periodicpayments/";


export const getAllPeriodicExpenseAction = () => (dispatch) =>
{
    axios.get(apiEndPoint).then(response => dispatch({
        type: GET_ALL_PERIODIC_EXPENSE,
        payload: { periodicExpenses: response.data.data }
    })).catch(error => console.log(error))
}

export const getCurrentPeriodicExpenses = (periodicExpenseId) => dispatch =>
{

    axios.get(apiEndPoint + periodicExpenseId).then(response =>
    {
        dispatch({
            type: GET_CURRENT_PERIODIC_EXPENSE,
            payload: { currentPeriodicExpense: response.data }
        })
    }).catch(error => console.log(error))
}

export const addPeriodicExpenseAction = (data) => (dispatch, getState) =>
{
    toast.promise(axios.post(apiEndPoint, data, { headers: { "Authorization": getState().loginReducer.token } }), {
        pending: "Adding your Periodic Expense",
        success: "Expense Added Successfully",
        error: "Something went wrong!"
    }).then(response => dispatch({
        type: CREATE_PERIODIC_EXPENSE,
        payload: { periodicExpense: response.data }
    })).catch(error => { })
}
export const updatePeriodicExpenseAction = (data) => (dispatch, getState) =>
{

    toast.promise(axios.patch(apiEndPoint + data._id, data, { headers: { "Authorization": getState().loginReducer.token } }), {
        pending: "Updating the Periodic Expense",
        error: "Something went wrong!"
    }).then(response =>
    {
        periodicExpenseUpdated(`${ response.data.description } is updated successfully`)
        dispatch({
            type: UPDATE_PERIODIC_EXPENSE,
            payload: { periodicExpense: response.data }
        })
    })
}