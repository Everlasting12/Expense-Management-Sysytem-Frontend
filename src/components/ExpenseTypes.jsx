import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {
  deleteExpenseTypeAction,
  getAllExpenseTypesAction,
} from "../redux/actions/expenseTypesActions";
import TableData from "./common/TableData";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

const ExpenseTypes = () => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const expenseTypes = useSelector(
    (state) => state.expenseTypesReducer.expenseTypes
  );

  useEffect(() => {
    dispatch(getAllExpenseTypesAction(""));
  }, []);

  useEffect(() => {
    dispatch(getAllExpenseTypesAction(searchText));
  }, [searchText]);

  const handleEdit = (expenseTypeId) => {
    console.log(expenseTypeId);
  };
  const handleDelete = (expenseTypeId) => {
    const result = window.confirm("Do you want to delete This Expense type?");
    if (result) dispatch(deleteExpenseTypeAction(expenseTypeId));
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
            value={searchText}
          />
          <MdSearch className="cursor-pointer rounded-full text-[#3F7BDA] text-xl" />
        </div>
        <div>
          <Link
            className="px-2 py-0 bg-[#3F7BDA] text-white rounded-full text-2xl shadow-md"
            to="expenseTypeForm"
          >
            +
          </Link>
        </div>
      </div>
      {expenseTypes.length == 0 ? (
        <span className="text-lg text-center block">
          No <b>Expense Types</b> in the Database...
        </span>
      ) : (
        <TableData
          name="Expense Type"
          data={expenseTypes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          textProp="name"
          link="expenseType/expenseTypeForm/"
        />
      )}
    </>
  );
};

export default ExpenseTypes;
