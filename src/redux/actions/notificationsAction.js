import axios from "axios"
import * as actions from "./actionTypes"
import { toast } from "react-toastify"

const notificationAddSuccess = (msg) => toast.success(msg, {
    position: "top-center",
    theme: "light",
    autoClose: 6000,
})
const notificationAddFailure = (msg) => toast.error(msg, {
    position: "top-center",
    theme: "light",
    autoClose: 6000,
})


// function promiseState(p)
// {
//     const t = {}
//     return Promise.race([p, t]).then(v => (v === t) ? "pending" : "fulfilled", () => "rejected")
// }


const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "api/notifications/"

export const getAllNotifications = () => (dispatch) =>
{
    axios.get(apiEndpoint).then(
        response => dispatch({ type: actions.GET_ALL_NOTIFICATION, payload: { notifications: response.data.data } })
    ).catch(error =>
    {
        console.log(error)
        notificationAddFailure(error.response.data.message)
    })
}
export const createNotification = (data) => (dispatch) =>
{
    toast.promise(
        axios.post(apiEndpoint, data),
        {
            pending: 'Processing your request...',
            success: 'Thank you for contacting us. We will connect with you shortly.',
            error: 'Email ID does not exists.\nPlease enter correct Email ID.'
        }, {
        position: "top-center",
        theme: "light",
        autoClose: 6000,
    }).then(response =>
    {
    }
    ).catch(error =>
    {
        // notificationAddFailure(error.response.data.message)
    })

}

export const updateNotifications = () => (dispatch) =>
{
    axios.patch(apiEndpoint + "?isViewed=false", {
        "isViewed": true
    }).then(
        response =>
        {
            dispatch({
                type: actions.UPDATE_NOTIFICATIONS,
                payload: { notifications: response.data }
            })
        }
    ).catch(error =>
    {
        console.log(error)
        // notificationAddFailure(error.response.data.message)
    })

}