import axios from "axios"
import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"
import * as actions from "./actionTypes"


const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "authentication"

export const loginAction = (data) => (dispatch) =>
{


    // const response = await axios.post(apiEndpoint, { ...data, "strategy": "local" })
    axios.post(apiEndpoint, { ...data, "strategy": "local" }).then(response =>
    {

        sessionStorage.setItem("token", response.data.accessToken)
        dispatch({ type: actions.LOGIN_USER, payload: { token: response.data.accessToken } })
    }).catch(error =>
    {
        toast.error("Error: " + error.response.data.message);
        
    })

}

export const loadLogin = () =>
{
    return {
        type: actions.LOGIN_USER,
        payload: { token: sessionStorage.getItem("token") }
    }
}

export const getloggedInUserDetails = () => async (dispatch, getState) =>
{
    const token = getState().loginReducer.token
    const user = jwtDecode(token)
    try
    {
        const response = await axios.get(process.env.REACT_APP_API_URL_FEATHERS + "users/" + user.sub)
        dispatch({ type: actions.GET_LOGGEDIN_USER_DETAILS, payload: { loggedInUser: response.data } })
    }
    catch (error)
    {
        console.log(error)
    }

}

export const logoutUser = () =>
{
    sessionStorage.setItem("token", "")

    return { type: actions.LOGOUT_USER }
}