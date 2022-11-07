import React from "react";
import emsLogo from "../assets/emsLogo.png";

import profileImage from "../assets/profileImage.jpg";
import {
  MdDashboard,
  MdNotifications,
  MdLogout,
  MdSearch,
  MdOutlineEdit,
  MdDeleteOutline,
} from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import MenuItems from "../components/common/MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllExpenseTypesAction } from "../redux/actions/expenseTypesActions";

const adminMenus = [
  {
    name: "Expense type",
    to: "/expenseType",
  },
  {
    name: "Users",
    to: "/users",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const expenseTypes = useSelector(
    (state) => state.expenseTypesReducer.expenseTypes
  );

  useEffect(() => {
    dispatch(getAllExpenseTypesAction());
  }, []);

  const handleEdit = (expenseTypeId) => {};
  const handleDelete = (expenseTypeId) => {};

  return (
    <div className="h-screen w-[94%] mx-auto flex">
      <div className="h-full bg-slate-50" style={{ flex: "2" }}>
        <div className="py-1 bg-slate-50">
          <img src={emsLogo} width="155px" alt="ems-logo" className="ml-2" />
        </div>
        <div className="w-full h-full bg-[#3F7BDA] pt-14 rounded-t-md">
          <div className=" bg-[#65D173] w-full  relative">
            <div className="w-16 h-16 overflow-clip rounded-full absolute top-[-30px] left-[50%] -translate-x-1/2">
              <img
                src={profileImage}
                alt="profileImage"
                className="w-16 h-16 object-cover"
              />
            </div>
            <div className="pt-10 pb-2 w-full flex flex-col">
              <span className="text-center text-white text-lg font-bold tracking-wider">
                Hello Sidhesh
              </span>
              <span className="text-center text-white text-sm font-[200]">
                Welcome back
              </span>
            </div>
          </div>

          <div className="mt-3 tracking-wider	">
            <NavLink className="px-2 py-2  hover:bg-[#3c73cc] flex items-center">
              <MdDashboard size={25} color="white" className="ml-2" />
              <span className="ml-2 text-white text-xs font-[200]">
                Dashboard
              </span>
            </NavLink>
            <NavLink className="px-2 py-2  hover:bg-[#3c73cc] flex items-center">
              <MdNotifications size={25} color="white" className="ml-2" />
              <span className="ml-2 text-white text-xs font-[200]">
                Notifications
              </span>
            </NavLink>
            <NavLink className="px-2 py-2  hover:bg-[#3c73cc] flex items-center">
              <HiWrenchScrewdriver size={25} color="white" className="ml-2" />
              <span className="ml-2 text-white text-xs font-[200]">
                Settings
              </span>
            </NavLink>
            <NavLink className="px-2 py-2  hover:bg-[#3c73cc] flex items-center">
              <MdLogout size={25} color="white" className="ml-2" />
              <span className="ml-2 text-white text-xs font-[200]">Logout</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="h-full w-full px-8 pb-5" style={{ flex: "9" }}>
        <div className="h-[70px] flex items-center">
          <span className="text-xl">Dashboard</span>
        </div>

        {/*  */}
        <MenuItems menus={adminMenus} />
        <div className="flex justify-between items-center my-3">
          <div className="w-1/3 flex items-center shadow rounded-lg overflow-clip px-3">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              className="px-2 py-2 outline-none text-sm placeholder:text-xs placeholder:text-slate-700 w-full"
            />
            <MdSearch className="cursor-pointer rounded-full text-[#3F7BDA] text-xl" />
          </div>
          <div>
            <button className="w-9 h-9 bg-[#3F7BDA] text-white rounded-full text-3xl shadow-md">
              +
            </button>
          </div>
        </div>
        {/* Expense Type Table */}

        <div className="overflow-x-auto relative mt-4">
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm  text-white bg-[#3F7BDA] dark:bg-gray-700 dark:text-gray-400">
              <tr className="font-nunito">
                <th scope="col" className="py-2 px-6 font-extralight">
                  No.
                </th>
                <th scope="col" className="py-2 px-6 font-extralight">
                  Expense Types
                </th>
                <th scope="col" className="py-2 px-6 font-extralight">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {expenseTypes.map((expenseType, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={expenseType._id}
                >
                  <th
                    scope="row"
                    className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {++index}. {expenseType.name}
                  </th>
                  <td className="py-2 px-6 flex ">
                    <MdOutlineEdit
                      size={20}
                      className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
                      onClick={() => handleEdit(expenseType._id)}
                    />
                    <MdDeleteOutline
                      size={20}
                      className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100 ml-2"
                      onClick={() => handleDelete(expenseType._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
