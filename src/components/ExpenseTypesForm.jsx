import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  addExpenseTypeAction,
  getCurrentExpenseTypeAction,
  updateExpenseTypeAction,
} from "../redux/actions/expenseTypesActions";

const schema = yup.object().shape({
  name: yup.string().required("Please enter Expense Type").min(2).max(50),
});

export function getExpenseTypeById({ params }) {
  return params.expenseTypeId;
}

const ExpenseTypesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenseTypeId = useLoaderData();
  const currentExpenseType = useSelector(
    (state) => state.expenseTypesReducer.currentExpenseType
  );
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (expenseTypeId) dispatch(getCurrentExpenseTypeAction(expenseTypeId));
  }, []);

  useEffect(() => {
    if (!expenseTypeId) return;
    setValue("name", currentExpenseType?.name);
    setValue("_id", currentExpenseType?._id);
  }, [currentExpenseType]);

  const onExpenseTypeFormSubmit = (data) => {
    if (data._id) {
      dispatch(updateExpenseTypeAction(data));
    } else {
      dispatch(addExpenseTypeAction(data));
    }
    navigate("/admin/expenseType");
  };
  return (
    <div className="w-full mx-auto my-5 flex justify-center items-center">
      <div className=" min-h-[30%] p-5 flex flex-col border-2 shadow-[0_2px_20px_#ddd] rounded-xl">
        <form onSubmit={handleSubmit(onExpenseTypeFormSubmit)}>
          <label htmlFor="expenseTypeName">Expense Type:</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your expense type..."
            className="px-3 py-2 w-full mt-1 rounded-md border-2 border-slate-300 outline-none focus:border-sky-600 placeholder:text-slate-800"
          />
          {expenseTypeId ? (
            <input
              type="submit"
              value="Edit Expense Type"
              className="w-30 my-3 py-2 px-3 float-right bg-sky-500 text-white cursor-pointer hover:bg-sky-600  focus:bg-sky-600 focus:shadow-lg rounded-md outline-none"
            />
          ) : (
            <input
              type="submit"
              value="Add Expense Type"
              className="w-30 my-3 py-2 px-3 float-right bg-sky-500 text-white cursor-pointer hover:bg-sky-600  focus:bg-sky-600 focus:shadow-lg rounded-md outline-none"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ExpenseTypesForm;
