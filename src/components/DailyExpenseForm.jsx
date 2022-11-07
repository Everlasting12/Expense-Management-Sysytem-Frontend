import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addDailyExpenses } from "../redux/actions/dailyExpensesAction";
import { getAllHouseholdForCurrentPrimaryUserAction } from "../redux/actions/householdsAction";

const schema = yup.object().shape({
  householdId: yup.string().required("Please select household"),
  expensetypeId: yup.string().required("Please select expense type"),
  paymentDetails: yup
    .object({
      date: yup
        .string()
        .required("Please select date")
        .test("isdate", "Please select duedate", function (value) {
          return Date(value);
        }),
      amount: yup
        .string()
        .required("Please enter the amount")
        .test("isNum", "Please enter only Numbers", function (value) {
          return Number(value);
        }),
      method: yup
        .string()
        .required("Please enter the payment method")
        .min(2)
        .max(100),
    })
    .required(),
  description: yup
    .string()
    .required("Please describe your expense")
    .min(3)
    .max(500),
  paidThrough: yup.string().required("Please enter Bank name").min(3).max(50),
  paidBy: yup.string().required("Please enter your name").min(3).max(50),
});

let householdArray = [];
const DailyExpenseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loginReducer.user);
  const members = useSelector((state) => state.membersReducer.members);

  const households = useSelector((state) => state.householdReducer.households);
  const expenseTypes = useSelector(
    (state) => state.expenseTypesReducer.expenseTypes
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(getAllHouseholdForCurrentPrimaryUserAction("", ""));
  }, []);

  function getHousehold() {
    if (loggedInUser.role === "primary user") {
      const array = [];
      members.forEach((m) => {
        if (m.user === loggedInUser._id) {
          let house = [];
          households.forEach((h) => {
            if (h.createdBy === loggedInUser._id) {
              house.push(h);
            }
            if (m.household === h._id) {
              house.push(h);
            }
          });
          array.push(...house);
        }
      });
      if (array.length === 0) {
        households.forEach((h) => {
          if (h.createdBy === loggedInUser._id) {
            array.push(h);
          }
        });
      }
      return array;
    }
    if (loggedInUser.role === "member") {
      const array = [];
      members.forEach((m) => {
        if (m.user === loggedInUser._id) {
          const house = households.find((h) => h._id === m.household);
          array.push(house);
        }
      });
      return array;
    }
  }

  const handleDailyExpenseForm = (data) => {
    // console.log(data);
    dispatch(addDailyExpenses(data));
    loggedInUser.role === "primary user"
      ? navigate("/primaryuser/dailyExpenses")
      : navigate("/member/dailyExpenses");
  };
  return (
    <div className="h-[90%] my-5 w-[80%] mx-auto px-1 paperWindow">
      <form
        className="w-full h-full"
        onSubmit={handleSubmit(handleDailyExpenseForm)}
      >
        <h3 className="text-center text-sky-500 font-bold text-xl">
          Add Daily Expense
        </h3>
        <div className="block md:flex w-full my-3">
          <label
            htmlFor="household"
            className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
          >
            Select Household
            <select
              name="household"
              id="household"
              className="bg-gray-50  border-gray-300 border text-gray-900 text-sm outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              {...register("householdId")}
            >
              <option value="">Select Household</option>
              {getHousehold().map((house) => {
                return (
                  <option value={house?._id} key={house?._id}>
                    {house?.name}
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
            Select Expense Type
            <select
              name="expenseType"
              id="expenseType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              {...register("expensetypeId")}
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
        <div className="block md:flex w-full my-3">
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
          <label
            htmlFor="paidBy"
            className="flex flex-col md:w-[48%] mx-[1%] text-sm my-1"
          >
            Paid By
            <input
              type="text"
              name="paidBy"
              id="paidBy"
              placeholder="Your Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
              {...register("paidBy")}
            />
            <p className="text-red-400">{errors.paidBy?.message}</p>
          </label>
        </div>

        <div className="block md:flex w-full my-3">
          <label
            htmlFor="paidamount"
            className={`flex flex-col  text-sm my-1 mx-[1%] md:w-1/3 w-full`}
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
              {...register("paymentDetails.amount")}
            />
            <p className="text-red-400">
              {errors.paymentDetails?.amount?.message}
            </p>
          </label>
          <label
            htmlFor="paiddate"
            className={`flex flex-col  text-sm my-1 mx-[1%] md:w-1/3 w-full`}
          >
            Paid On
            <input
              type="date"
              name="paiddate"
              id="paiddate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
              {...register("paymentDetails.date")}
            />
            <p className="text-red-400">
              {errors.paymentDetails?.date?.message}
            </p>
          </label>
          <label
            htmlFor="paidmethod"
            className={`flex flex-col w-full text-sm my-1 mx-[1%] md:w-1/3 `}
          >
            Payment Method
            <input
              type="text"
              name="paidmethod"
              id="paidmethod"
              placeholder="eg. UPI"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              placeholder:text-slate-700"
              {...register("paymentDetails.method")}
            />
            <p className="text-red-400">
              {errors.paymentDetails?.method?.message}
            </p>
          </label>
        </div>
        <input
          type="submit"
          value="Create Expense"
          className="block w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 text-white rounded-md cursor-pointer"
        />
      </form>
    </div>
  );
};

export default DailyExpenseForm;
