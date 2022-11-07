import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_MEMBER, DELETE_MEMBER, GET_ALL_MEMBERS, GET_CURRENT_MEMBER } from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL_FEATHERS + "api/householdmembers/"

const memberAddedSuccess = (msg) => toast.success(msg, { theme: "light" })
const memberAddingFailed = (msg) => toast.error(msg, { theme: "light" })

export const getAllMembersAction = () => dispatch =>
{
    axios.get(apiEndPoint).then(response => dispatch({
        type: GET_ALL_MEMBERS,
        payload: {
            members: response.data.data,
        }
    })).catch(error => console.log(error))
}

export const addMemberAction = (data) => (dispatch, getState) =>
{
    axios.post(apiEndPoint, data, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }).then(response =>
    {
        memberAddedSuccess("Member added successfully")

        dispatch({
            type: CREATE_MEMBER,
            payload: { member: response.data }
        })

    }).catch(error =>
    {
        console.log(error)
        memberAddingFailed(error.response.data.message)
    })
}


export const deleteMemberAction = (memberId) => (dispatch, getState) =>
{
    axios.delete(apiEndPoint + memberId, {
        headers: {
            "Authorization": getState().loginReducer.token
        }
    }).then(
        response => dispatch({
            type: DELETE_MEMBER,
            payload: { member: response.data }
        })
    ).catch(error => console.log(error))
}

export const getCurrentMemberAction = memberId => dispatch =>
{
    axios.get(apiEndPoint + memberId)
        .then(response =>
        {

            dispatch({
                type: GET_CURRENT_MEMBER,
                payload: { currentMember: response.data }
            })
        })
        .catch(error => console.log(error))
}