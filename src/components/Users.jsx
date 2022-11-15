import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../redux/actions/usersAction";
import TableData from "./common/TableData";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const users = useSelector((state) => state.usersReducer.users);
  useEffect(() => {
    dispatch(getAllUsersAction(""));
  }, []);
  useEffect(() => {
    dispatch(getAllUsersAction(searchText));
  }, [searchText]);

  const handleEdit = (userId) => {
    console.log(userId);
  };
  const handleDelete = (userId) => {
    const result = window.confirm("Do you want to delete this User?");
    if (result) dispatch(deleteUserAction(userId));
  };
  return (
    <>
      <div className="flex justify-between items-center my-3">
        <div className="md:w-1/3 flex items-center shadow rounded-lg overflow-clip px-3">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="px-2 py-2 outline-none text-sm placeholder:text-xs placeholder:text-slate-700 w-full"
            onChange={(e) => {
              setSearchText(e.target.value.trim());
            }}
            // value={searchText}
          />
          <MdSearch className="cursor-pointer rounded-full text-[#3F7BDA] text-xl" />
        </div>
      </div>
      {users.length == 0 ? (
        <span className="text-lg text-center block">
          No <b>Users</b> in the Database...
        </span>
      ) : (
        <TableData
          name="Users"
          data={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          textProp="firstName"
          link="userForm/"
        />
      )}
    </>
  );
};

export default Users;
