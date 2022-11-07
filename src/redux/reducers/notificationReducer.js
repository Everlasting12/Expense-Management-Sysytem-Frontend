import { GET_ALL_NOTIFICATION, UPDATE_NOTIFICATIONS } from "../actions/actionTypes";


export const notificationReducer = (state = { notifications: [], latestCount: 0 }, action) =>
{
    switch (action.type)
    {
        case GET_ALL_NOTIFICATION:
            let count = 0
            action.payload.notifications.forEach((notif) =>
            {
                if (notif.isViewed === false)
                {
                    count = count + 1;
                }
            })

            return { latestCount: count, notifications: action.payload.notifications }

        case UPDATE_NOTIFICATIONS:
            const notification = action.payload.notifications
            let newcount = 0
            notification.forEach((notif) =>
            {
                if (notif.isViewed === false)
                {
                    count = count + 1;
                }
            })
            return { ...state, latestCount: newcount }
        default:
            return state;
    }

}