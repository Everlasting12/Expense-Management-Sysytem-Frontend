import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getloggedInUserDetails } from "../redux/actions/loginAction";
import {
  getCurrentPeriodicExpenses,
  addPeriodicExpenseAction,
  updatePeriodicExpenseAction,
} from "../redux/actions/periodicExpenseAction";

export function getPeriodicExpenseById({ params }) {
  return params.periodicExpenseId;
}
const schema = yup.object().shape({
  householdId: yup.string().required("Please select household"),
  expensetypeId: yup.string().required("Please select expenseType"),
  frequency: yup.string().required("Please select frequency"),
  duedate: yup
    .string()
    .required("Please select duedate")
    .test("isdate", "Please select duedate", function (value) {
      return Date(value);
    }),
  amount: yup
    .string()
    .required("Please enter the amount")
    .test("isNum", "Please enter only Numbers", function (value) {
      return Number(value);
    }),
  description: yup.string().required("Please describe expense").min(3).max(500),
});
const frequency = ["yearly", "monthly", "weekly"];

const PeriodicExpenseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const periodicExpenseId = useLoaderData();
  const households = useSelector((state) => state.householdReducer.households);
  const expenseTypes = useSelector(
    (state) => state.expenseTypesReducer.expenseTypes
  );
  const currentPeriodicExpense = useSelector(
    (state) => state.periodicExpenseReducer.currentPeriodicExpense
  );

  const loggedInUser = useSelector((state) => state.loginReducer.user);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    // dispatch(getloggedInUserDetails());
    if (periodicExpenseId)
      dispatch(getCurrentPeriodicExpenses(periodicExpenseId));
  }, []);
  useEffect(() => {
    if (!periodicExpenseId) return;
    if (currentPeriodicExpense) {
      if (currentPeriodicExpense.dueDate)
        setValue("duedate", currentPeriodicExpense.dueDate.split("T")[0]);
      setValue("householdId", currentPeriodicExpense.household);
      setValue("expensetypeId", currentPeriodicExpense.expensetype);
      setValue("frequency", currentPeriodicExpense.frequency);
      setValue("amount", currentPeriodicExpense.amount);
      setValue("description", currentPeriodicExpense.description);
      // setValue("paidamount", currentPeriodicExpense.paidamount);
      // setValue("paidThrough", currentPeriodicExpense.paidThrough);
      // setValue("paiddate", currentPeriodicExpense.paiddate);
      // setValue("paidmethod", currentPeriodicExpense.paidmethod);
      setValue("_id", currentPeriodicExpense._id);
    }
  }, [currentPeriodicExpense]);

  const handlePeriodicExpenseForm = (data) => {
    // console.log(data);
    if (data._id) {
      const peData = {
        // ...data,
        dueDate: data.duedate,
        paidThrough: data.paidThrough,
        paymentDetails: [
          {
            amount: data.paidamount,
            date: data.paiddate,
            method: data.paidmethod,
          },
        ],
        paidBy: [loggedInUser.firstName],
        _id: data._id,
      };

      dispatch(updatePeriodicExpenseAction(peData));
    } else {
      const peData = { ...data, dueDate: data.duedate };
      delete peData.duedate;

      dispatch(addPeriodicExpenseAction(peData));
    }
    if (loggedInUser.role === "primary user")
      navigate("/primaryuser/periodicExpenses");
    else if (loggedInUser.role === "member")
      navigate("/member/periodicExpenses");
  };

  return (
    <div className="h-[90%] my-5 w-[80%] mx-auto">
      <form
        className="w-full h-full"
        onSubmit={handleSubmit(handlePeriodicExpenseForm)}
      >
        <h3 className="text-center text-sky-500 font-bold text-xl">
          {periodicExpenseId ? "Edit" : "Add"} Periodic Expense
        </h3>
        <div className="block md:flex w-full my-3">
          <label
            htmlFor="household"
            className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
          >
            {periodicExpenseId ? "" : "Select"} Household
            <select
              name="household"
              id="household"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              {...register("householdId")}
              disabled={periodicExpenseId ? true : false}
            >
              <option value="">Select Household</option>
              {households.map((house) => {
                return (
                  <option value={house._id} key={house._id}>
                    {house.name}
                  </option>
                );
              })}
            </select>
            <p className="text-red-400">{errors.householdId?.message}</p>
          </label>
          <label
            htmlFor="expenseType"
            className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
          >
            {periodicExpenseId ? "" : "Select"} Expense Type
            <select
              name="expenseType"
              id="expenseType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              {...register("expensetypeId")}
              disabled={periodicExpenseId ? true : false}
            >
              <option value="">Select Expense Type</option>
              {expenseTypes.map((expenseType) => {
                return (
                  <option value={expenseType._id} key={expenseType._id}>
                    {expenseType.name}
                  </option>
                );
              })}
            </select>
            <p className="text-red-400">{errors.expensetypeId?.message}</p>
          </label>
        </div>

        <div className="block md:flex w-full my-3">
          <label
            htmlFor="frequency"
            className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
          >
            {periodicExpenseId ? "" : "Select"} Frequency
            <select
              name="frequency"
              id="frequency"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              {...register("frequency")}
              disabled={periodicExpenseId ? true : false}
            >
              <option value="">Select Frequency</option>
              {frequency.map((freq) => {
                return (
                  <option value={freq} key={freq}>
                    {freq}
                  </option>
                );
              })}
            </select>
            <p className="text-red-400">{errors.frequency?.message}</p>
          </label>
          <label
            htmlFor="duedate"
            className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
          >
            Select Due Date
            <input
              type="date"
              name="duedate"
              id="duedate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              {...register("duedate")}
            />
            <p className="text-red-400">{errors.duedate?.message}</p>
          </label>
        </div>

        <div className="block md:flex w-full my-3">
          <label
            htmlFor="amount"
            className={`flex flex-col  text-sm my-1 mx-[1%] ${
              periodicExpenseId ? "md:w-[48%]" : "w-full"
            }`}
          >
            Enter Amount
            <input
              type="text"
              name="amount"
              id="amount"
              pattern="[0-9]+"
              placeholder="₹ Amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
              {...register("amount")}
              disabled={periodicExpenseId ? true : false}
            />
            <p className="text-red-400">{errors.amount?.message}</p>
          </label>
          {periodicExpenseId ? (
            <label
              htmlFor="paidThrough"
              className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
            >
              Paid Through
              <input
                type="text"
                name="paidThrough"
                id="paidThrough"
                placeholder="Bank Name..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
                {...register("paidThrough")}
              />
              <p className="text-red-400">{errors.paidThrough?.message}</p>
            </label>
          ) : (
            ""
          )}
        </div>

        <div className="block md:flex w-full my-3">
          <label
            htmlFor="description"
            className="w-full flex flex-col text-sm my-1 mx-1"
          >
            Enter Description
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-slate-700"
              placeholder="Description here..."
              {...register("description")}
            ></textarea>
            <p className="text-red-400">{errors.description?.message}</p>
          </label>
        </div>

        {periodicExpenseId ? (
          <div className="block md:flex w-full my-3">
            <label
              htmlFor="paidamount"
              className={`flex flex-col  text-sm my-1 mx-[1%] ${
                periodicExpenseId ? "md:w-1/3 " : "w-full"
              }`}
            >
              Paid Amount
              <input
                type="text"
                name="paidamount"
                id="paidamount"
                pattern="[0-9]+"
                placeholder="₹ Amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
                {...register("paidamount")}
              />
              <p className="text-red-400">{errors.paidamount?.message}</p>
            </label>
            <label
              htmlFor="paiddate"
              className={`flex flex-col  text-sm my-1 mx-[1%] ${
                periodicExpenseId ? "md:w-1/3 " : "w-full"
              }`}
            >
              Paid On
              <input
                type="date"
                name="paiddate"
                id="paiddate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
                {...register("paiddate")}
              />
              <p className="text-red-400">{errors.paiddate?.message}</p>
            </label>
            <label
              htmlFor="paidmethod"
              className={`flex flex-col  text-sm my-1 mx-[1%] ${
                periodicExpenseId ? "md:w-1/3 " : "w-full"
              }`}
            >
              Payment Method
              <input
                type="text"
                name="paidmethod"
                id="paidmethod"
                placeholder="eg. UPI"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
                {...register("paidmethod")}
              />
              <p className="text-red-400">{errors.paidmethod?.message}</p>
            </label>
          </div>
        ) : (
          ""
        )}

        <input
          type="submit"
          value={periodicExpenseId ? "Update Expense" : "Create Expense"}
          className="block w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 text-white rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
};

export default PeriodicExpenseForm;
