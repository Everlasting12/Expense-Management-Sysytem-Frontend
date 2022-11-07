import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  updateNotifications,
} from "../redux/actions/notificationsAction";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationReducer.notifications
  );
  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(updateNotifications());
  }, []);

  return (
    <div className="h-[calc(100%-160px)] w-full overflow-y-auto mt-4 paperWindow">
      {notifications.length == 0 ? (
        <h2 className="text-center">Notifications not found in the database</h2>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead
            className="sticky top-0 text-white bg-[#3F7BDA] dark:bg-gray-700 dark:text-gray-400"
            style={{ zIndex: "1" }}
          >
            <tr className="sticky top-0 font-nunito">
              <th
                scope="col"
                className="sticky top-0 py-2 px-3 font-extralight"
              >
                No.
              </th>
              <th
                scope="col"
                className="sticky top-0 py-2 px-3 font-extralight"
              >
                Name
              </th>
              <th
                scope="col"
                className="sticky top-0 py-2 px-3 font-extralight"
              >
                Email Id
              </th>
              <th
                scope="col"
                className="sticky top-0 py-2 px-3 font-extralight"
              >
                Message
              </th>
              <th
                scope="col"
                className="sticky top-0 py-2 px-3 font-extralight"
              >
                Ticket No.
              </th>
              <th scope="col" className="sticky top-0 py-2  font-extralight">
                Is Member
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {notifications.map((item, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <td className="py-2 px-3">{++index}.</td>
                <td className="py-2 px-3">
                  {item.firstName + " " + item.lastName}
                </td>
                <td className="py-2 px-3">{item.emailid}</td>
                <td className="py-2 px-3 text-justify">{item.message}</td>
                <td className="py-2 px-3">{item.issueNumber}</td>
                <td className="py-2 px-3">
                  {item.isRegistered ? "Member" : "NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Notifications;
