import axios from "axios"
import { toast } from "react-toastify"
import * as actions from "./actionTypes"
import jwtDecode from "jwt-decode"

const resetPasswordSuccess = (msg) => toast.success(msg)
const resetPasswordFailed = (msg) => toast.error(msg, { autoClose: 5000, })
const resetPasswordLinkSent = (msg) => toast.success(msg, { theme: "light", autoClose: 4000 })

const apiEndpoint = process.env.REACT_APP_API_URL_FEATHERS + "users/"
export const getAllUsersAction = (searchText) => (dispatch) =>
{
    axios.get(apiEndpoint + `?fullname=${ searchText }`)
        .then(response => dispatch({ type: actions.GET_ALL_USERS, payload: { users: response.data.data } })
        )
        .catch(error => console.log(error))
}

export const deleteUserAction = (userId) => (dispatch, getState) =>
{
    toast.promise(axios.delete(apiEndpoint + userId, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }), {
        pending: "Deleting User...",
        success: "User deleted successfully!",
        error: "Something went wrong"
    }).then(response => dispatch({ type: actions.DELETE_USER, payload: { user: response.data } })
    ).catch(error => console.log(error))
}

export const getCurrentUserAction = (userId) => (dispatch) =>
{
    axios.get(apiEndpoint + userId).then(response => dispatch({
        type: actions.GET_CURRENT_USER,
        payload: { currentUser: response.data }
    })).catch(error => console.log(error))
}

export const updateUserAction = (data) => (dispatch, getState) =>
{
    const user = { ...data }
    delete user._id
    toast.promise(axios.patch(apiEndpoint + data._id, user, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }), {
        pending: "Updating user...",
        success: "User updated successfully!",
        error: "Something went wrong"
    }).then(response => dispatch({
        type: actions.UPDATE_USER,
        payload: { user: response.data }
    })).catch(error => console.log(error))
}



export const getAllUsersOfRoleMember = () => (dispatch, getState) =>
{
    const loggedInUser = getState().loginReducer.user

    axios.get(apiEndpoint + "?role=member&role=primary user&_id=" + loggedInUser._id).then(response => dispatch({
        type: actions.GET_ALL_USERS_OF_MEMBER_ROLE,
        payload: { usersOfRoleMember: response.data.data }
    }))
}


const apiEndPointForgotPassword = process.env.REACT_APP_API_URL_FEATHERS + "auth-management/"
export const forgetPasswordUser = (data) => (dispatch) =>
{

    toast.promise(axios.post(apiEndPointForgotPassword, data), {
        pending: "Processing your request...",
        success: "Reset Password link is sent to you by Email"
    }).then(response =>
    {

    }).catch(error =>
    {
        resetPasswordFailed(error.response.data.message)

    })
}


export const resetPasswordUser = (data) => (dispatch) =>
{

    toast.promise(axios.post(apiEndPointForgotPassword, data), {
        pending: "Processing your request..."
    }).then(response =>
    {
        resetPasswordSuccess(response.data.message)
        setTimeout(() =>
        {
            window.location.replace("https://blooming-brushlands-42033.herokuapp.com/login");
        }, 5000);
    }).catch(error =>
    {
        resetPasswordFailed(error.response.data.message)
    }
    )
}

export const resendVerifyAccountLink = (email) => (dispatch) =>
{
    let data = {
        "action": "resendVerifySignup",
        "value": {
            "email": email
        },
        "notifierOptions": {}
    }
    toast.promise(axios.post(apiEndPointForgotPassword, data), {
        pending: "processing your request...",
        error: "Could not send the verification link.",
        success: "Verification link is sent to your email."
    })
        .then(res => console.log(res))
        .catch(e => console.log(e))
}

export const activateAccount = (data) => (dispatch) =>
{
    toast.promise(axios.post(apiEndPointForgotPassword, data), {
        pending: "processing your request...",
        error: "Could not activate the account!",
        success: "Account Verified Successfully!"
    })
        .then(
            setTimeout(() =>
            {
                window.location.replace("https://blooming-brushlands-42033.herokuapp.com/")
            }, 2000)

        )
        .catch(error => console.log(error))
}

































// const apiEndPointForgotPassword = process.env.REACT_APP_API_URL_FEATHERS + "forgetpassword/"

// export const forgetPasswordUser = (data) => (dispatch) =>
// {

//     toast.promise(axios.put(apiEndPointForgotPassword, data), {
//         pending: "Processing your request..."
//     }).then(response =>
//     {
//         console.log("email sent successfully")
//     }).catch(error =>
//     {
//         const { name, code, message } = error.response.data
//         if (code === 400 && name === 'BadRequest' && message === "You can not replace multiple instances. Did you mean 'patch'?")
//         {
//             // window.location.replace("http://localhost:3000/");
//             resetPasswordLinkSent("An Email with Reset Link is sent to your email id")
//             setTimeout(() =>
//             {
//                 window.location.href = "https://blooming-brushlands-42033.herokuapp.com/";
//             }, 5000);
//         }
//         else
//         {
//             resetPasswordFailed(error.response.data.message)
//         }
//     })
// // }
// export const resetPasswordUser = (data) => (dispatch) =>
// {
//     try
//     {
//         const user = jwtDecode(data.resetLink)

//         {
//             toast.promise(axios.patch(apiEndPointForgotPassword + user._id, data), {
//                 pending: "Processing your request..."
//             }).then(response =>
//             {
//                 resetPasswordSuccess("Password Reset Successful")
//                 setTimeout(() =>
//                 {
//                     window.location.replace("https://blooming-brushlands-42033.herokuapp.com/login");
//                 }, 5000);
//                 // window.location.href = "http://localhost:3000/login";
//             }).catch(error =>
//             {
//                 resetPasswordFailed(error.response.data.message)
//             }
//             )
//         }
//     }
//     catch (error)
//     {
//         resetPasswordFailed("Invalid Token Provided")
//     }
// }
// }
