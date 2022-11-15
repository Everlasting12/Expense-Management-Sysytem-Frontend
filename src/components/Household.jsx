import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import TableData from "./common/TableData";
import { MdSearch } from "react-icons/md";
import {
  deleteHouseholdAction,
  getAllHouseholdForCurrentPrimaryUserAction,
} from "../redux/actions/householdsAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Household = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const households = useSelector((state) => state.householdReducer.households);
  const loggedInUser = useSelector((state) => state.loginReducer.user);

  useEffect(() => {
    if (loggedInUser)
      dispatch(
        getAllHouseholdForCurrentPrimaryUserAction(loggedInUser._id, "")
      );
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser)
      dispatch(
        getAllHouseholdForCurrentPrimaryUserAction(loggedInUser._id, searchText)
      );
  }, [searchText]);

  const handleDelete = (householdId) => {
    const result = window.confirm("Do you want to delete this Household?");
    if (result) dispatch(deleteHouseholdAction(householdId));
  };

  return (
    <>
      <div className="flex justify-between items-center my-3">
        <div className="w-1/3 flex items-center shadow rounded-lg overflow-clip px-3">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="px-2 py-2 outline-none text-sm placeholder:text-xs placeholder:text-slate-700 w-full"
            onChange={(e) => {
              setSearchText(e.target.value.trim());
            }}
          />
          <MdSearch className="cursor-pointer rounded-full text-[#3F7BDA] text-xl" />
        </div>
        <div>
          <Link
            className="px-2 py-0 bg-[#3F7BDA] text-white rounded-full text-2xl shadow-md"
            to="householdForm"
          >
            +
          </Link>
        </div>
      </div>
      {households.length == 0 ? (
        <span className="text-lg text-center block">
          No <b>Housholds</b> in the Database...
        </span>
      ) : (
        <TableData
          name="Household Name"
          data={households}
          // onEdit={handleEdit}
          onDelete={handleDelete}
          textProp="name"
          link="household/householdForm/"
        />
      )}
    </>
  );
};

export default Household;
