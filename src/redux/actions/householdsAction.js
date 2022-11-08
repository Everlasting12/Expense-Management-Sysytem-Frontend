import axios from "axios"
import * as actions from "./actionTypes"
import { toast } from "react-toastify"
const householdAdded = () => toast.success("Household Added", { autoClose: 2000, })
const householdAddedError = (msg) => toast.error("Error in houshold creation: " + msg, { autoClose: 5000, })
const householdUpdated = () => toast.success("Household Updated", { autoClose: 2000, })
const householdUpdateError = (msg) => toast.error("Error in houshold " + msg, { autoClose: 2000, })

const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "api/households/"

export const getAllHouseholdForCurrentPrimaryUserAction = (primaryUserId, searchText) => (dispatch) =>
{
    // axios.get(apiEndpoint + "?createdBy=" + primaryUserId)
    axios.get(apiEndpoint + `${ primaryUserId ? "?createdBy=" + primaryUserId : "" }` + `${ searchText ? "&name=" + searchText : "" }`)
        .then(response => dispatch({ type: actions.GET_ALL_HOUSEHOLDS, payload: { households: response.data.data } })
        )
        .catch(error => console.log(error))
}

// export const getAllHouseholdsAction = () => (dispatch) =>
// {
//     // axios.get(apiEndpoint + "?createdBy=" + primaryUserId)
//     axios.get(apiEndpoint)
//         .then(response => dispatch({ type: actions.GET_ALL_HOUSEHOLDS_FOR_MEMBER, payload: { households: response.data.data } })
//         )
//         .catch(error => console.log(error))
// }

export const deleteHouseholdAction = (householdId) => (dispatch, getState) =>
{
    axios.delete(apiEndpoint + householdId, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.DELETE_HOUSEHOLD, payload: { household: response.data } }))
        .catch(error => console.log(error))
}
export const createHouseholdAction = (data) => (dispatch, getState) =>
{
    toast.promise(axios.post(apiEndpoint, data, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }), {
        pending: "Adding Houehold"
    })
        .then(response =>
        {
            householdAdded();
            dispatch({ type: actions.CREATE_HOUSEHOLD, payload: { household: response.data } })
        })

        .catch(error =>
        {
            householdAddedError(error.response.data.message)
            console.log(error)
        })
}
export const updateHouseholdAction = (data) => (dispatch, getState) =>
{
    const householdData = { ...data }
    delete householdData._id
    axios.put(apiEndpoint + data._id, householdData, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    })
        .then(response =>
        {
            householdUpdated();
            dispatch({ type: actions.UPDATE_HOUSEHOLD, payload: { household: response.data } })
        })

        .catch(error =>
        {
            householdUpdateError(error)
            console.log(error)
        })
}

export const getCurrentHouseholdAction = householdId => (dispatch) =>
{

    axios.get(apiEndpoint + householdId)
        .then(response => dispatch({ type: actions.GET_CURRENT_HOUSEHOLD, payload: { currentHousehold: response.data } }))
        .catch(error => console.log(error))
}

