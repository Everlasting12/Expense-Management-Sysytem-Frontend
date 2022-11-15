import axios from "axios"
import { toast } from "react-toastify"
import * as actions from "./actionTypes"

const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "api/expensetypes/"
export const getAllExpenseTypesAction = (searchText) => (dispatch) =>
{
    axios.get(apiEndpoint + `?name=${ searchText }`)
        .then(response => dispatch({ type: actions.GET_ALL_EXPSENSE_TYPES, payload: { expenseTypes: response.data.data } })
        )
        .catch(error => console.log(error))
}


export const addExpenseTypeAction = (data) => (dispatch, getState) =>
{
    toast.promise(axios.post(apiEndpoint, data, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }), {
        pending: "Adding Expense type",
        success: "Expense Type added successfully!",
        error: "Something went wrong"
    })
        .then(response => dispatch({ type: actions.CREATE_EXPSENSE_TYPES, payload: { expenseType: response.data } })
        )
        .catch(error => console.log(error))
}


export const deleteExpenseTypeAction = (expenseTypeId) => (dispatch, getState) =>
{
    toast.promise(axios.delete(apiEndpoint + expenseTypeId, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }), {
        pending: "Deleting Expense type",
        success: "Expense Type deleted successfully!",
        error: "Something went wrong"
    })
        .then(response => dispatch({ type: actions.DELETE_EXPSENSE_TYPES, payload: { expenseType: response.data } }))
        .catch(error => console.log(error))
}

export const getCurrentExpenseTypeAction = (expenseTypeId) => (dispatch) =>
{
    axios.get(apiEndpoint + expenseTypeId).then(response => dispatch({
        type: actions.GET_CURRENT_EXPENSE_TYPE,
        payload: { currentExpenseType: response.data }
    }))
        .catch(error => console.log(error))
}

export const updateExpenseTypeAction = (data) => (dispatch, getState) =>
{

    toast.promise(axios.put(apiEndpoint + data._id, { name: data.name }, {
        headers: { "Authorization": getState().loginReducer.token }
    }), {
        pending: "Updating Expense type",
        success: "Expense Type updated successfully!",
        error: "Something went wrong"
    }).then(response => dispatch({ type: actions.UPDATE_EXPSENSE_TYPES, payload: { expenseType: response.data } }))
        .catch(error => console.log(error))
}