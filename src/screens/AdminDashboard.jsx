import React, { useState } from "react";
import emsLogo from "../assets/emsLogo.png";
import Badge from "@mui/material/Badge";
import profileImage from "../assets/profileImage.png";
import { MdDashboard, MdNotifications, MdLogout } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import MenuItems from "../components/common/MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllExpenseTypesAction } from "../redux/actions/expenseTypesActions";
import {
  getloggedInUserDetails,
  logoutUser,
} from "../redux/actions/loginAction";
import { getAllUsersAction } from "../redux/actions/usersAction";
import { getAllNotifications } from "../redux/actions/notificationsAction";

const adminMenus = [
  {
    name: "Expense type",
    to: "/admin/expenseType",
  },
  {
    name: "Users",
    to: "/admin/users",
  },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const notificationCount = useSelector(
    (state) => state.notificationReducer.latestCount
  );
  const notifications = useSelector(
    (state) => state.notificationReducer.notifications
  );
  const loggedInUser = useSelector((state) => state.loginReducer.user);
  const [avatar, setAvatar] = useState(profileImage);

  useEffect(() => {
    dispatch(getAllExpenseTypesAction(""));
    dispatch(getloggedInUserDetails());
    dispatch(getAllUsersAction(""));
    dispatch(getAllNotifications());
  }, []);
  // useEffect(() => {
  //   // dispatch(getAllNotifications());
  //   console.log("notifications am changed");
  // }, [notifications]);

  useEffect(() => {
    if (loggedInUser?.profileImage?.imageBuffer) {
      var base64Flag = `data:${loggedInUser?.profileImage.type};base64,`;
      setAvatar(base64Flag + loggedInUser?.profileImage.imageBuffer);
    }
  }, [loggedInUser]);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="h-screen w-[94%] mx-auto flex">
      <div
        className="h-full bg-slate-50"
        style={{
          flex: "2",
          background:
            "linear-gradient(to bottom, #F9F9F9 20%, #3F7BDA 20% 100%)",
        }}
      >
        <div className="py-1 bg-slate-50">
          <img src={emsLogo} width="155px" alt="ems-logo" className="ml-2" />
        </div>
        <div className="w-full bg-[#3F7BDA] pt-14 rounded-t-md">
          <div className=" bg-[#65D173] w-full  relative">
            <div className="w-16 h-16 bg-white overflow-clip rounded-full absolute top-[-30px] left-[50%] -translate-x-1/2">
              <img
                src={avatar}
                alt="profileImage"
                className="w-16 h-16 object-cover"
              />
            </div>
            <div className="pt-10 pb-2 w-full flex flex-col">
              <span className="text-center text-white text-lg font-bold tracking-wider">
                Hello {loggedInUser?.firstName}
              </span>
              <span className="text-center text-white text-sm font-[200]">
                Welcome back
              </span>
            </div>
          </div>

          <div className="mt-3 tracking-wider	">
            <NavLink
              className="px-2 py-2  hover:bg-[#3c73cc] flex items-center"
              to="/admin"
            >
              <MdDashboard size={25} color="white" className="ml-2" />
              <span className="ml-2 text-white text-xs font-[200]">
                Dashboard
              </span>
            </NavLink>
            <NavLink
              className="px-2 py-2  hover:bg-[#3c73cc] flex items-center"
              to="notifications"
            >
              <Badge badgeContent={notificationCount} color="error">
                <MdNotifications size={25} color="white" className="ml-2" />
              </Badge>
              <span className="ml-2 text-white text-xs font-[200]">
                Notifications
              </span>
            </NavLink>
            <NavLink className="px-2 py-2  hover:bg-[#3c73cc] flex items-center">
              <MdSettings size={25} color="white" className="ml-2" />

              <span className="ml-2 text-white text-xs font-[200]">
                Settings
              </span>
            </NavLink>
            <button
              className="w-full px-2 py-2  hover:bg-[#3c73cc] flex items-center"
              onClick={handleLogOut}
            >
              <MdLogout size={25} color="white" className="ml-[10px]" />
              <span className="ml-2 text-white text-xs font-[200]">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="h-full w-full px-8 pb-5" style={{ flex: "9" }}>
        <div className="h-[70px] flex items-center">
          <span className="text-xl">Admin Dashboard</span>
        </div>
        {/*  */}
        <MenuItems type="admin" menus={adminMenus} />

        {/* Expense Type Table */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
