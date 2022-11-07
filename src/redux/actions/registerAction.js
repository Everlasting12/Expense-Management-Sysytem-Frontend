import axios from "axios"
import * as actions from "./actionTypes"
import { toast } from "react-toastify"
const userAddedSuccessfully = (user) => toast.success("Welcome Aboard, " + user, { autoClose: 2000, })
const userAddingFailed = (msg) => toast.error("Something Went Wrong!\n" + msg, { autoClose: 5000, })

const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "users"

export const registerAction = (data) => (dispatch) =>
{

    axios.post(apiEndpoint, data
        , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )
        .then(response =>
        {
            dispatch({ type: actions.REGISTER_USER })
            userAddedSuccessfully(response.data.firstName + " " + response.data.lastName)
        }).catch(error =>
        {
            console.log(error)
            userAddingFailed(error.response.data)
        })
}