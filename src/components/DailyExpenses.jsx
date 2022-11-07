import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDailyExpenses } from "../redux/actions/dailyExpensesAction";
import { getAllHouseholdForCurrentPrimaryUserAction } from "../redux/actions/householdsAction";
import PopupModal from "./common/PopupModal";

//
// custom Hook

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let mayBeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", mayBeHandler);

    return () => {
      document.removeEventListener("mousedown", mayBeHandler);
    };
  });
  return domNode;
};

//

const DailyExpenses = () => {
  const dispatch = useDispatch();

  const [expandDailyExpense, setExpandDailyExpense] = useState(false);
  const [dailyExp, setDailyExp] = useState([]);

  const [searchText, setSearchText] = useState("");
  const dailyExpenses = useSelector(
    (state) => state.dailyExpenseReducer.dailyExpenses
  );
  const members = useSelector((state) => state.membersReducer.members);

  const households = useSelector((state) => state.householdReducer.households);

  const expenseTypes = useSelector(
    (state) => state.expenseTypesReducer.expenseTypes
  );
  const loggedInUser = useSelector((state) => state.loginReducer.user);
  const [role, setRole] = useState(loggedInUser.role);

  useEffect(() => {
    dispatch(getAllDailyExpenses());
  }, []);
  useEffect(() => {
    getHouseholdDailyExpenses();
  }, [searchText]);

  useEffect(() => {
    role === "member"
      ? dispatch(getAllHouseholdForCurrentPrimaryUserAction("", ""))
      : dispatch(
          getAllHouseholdForCurrentPrimaryUserAction(loggedInUser._id, "")
        );
  }, [role]);

  function getHouseholdDailyExpenses() {
    let array = [];
    let Atotal = 0;
    if (role === "primary user") {
      households.forEach((household) => {
        dailyExpenses.forEach((dailyExp) => {
          if (household._id === dailyExp.household) {
            const expenseType = expenseTypes.find(
              (exptype) => exptype._id === dailyExp.expensetype
            );
            array.push({
              ...dailyExp,
              householdName: household.name,
              expenseTypeName: expenseType?.name,
            });
            Atotal += dailyExp.paymentDetails.amount;
          }
        });
      });
    } else if (role === "member") {
      members.forEach((m) => {
        if (m.user === loggedInUser._id) {
          dailyExpenses.forEach((de) => {
            if (de.household === m.household) {
              const expenseType = expenseTypes.find(
                (exptype) => exptype._id === de.expensetype
              );
              const household = households.find((h) => h._id === m.household);
              array.push({
                ...de,
                householdName: household?.name,
                expenseTypeName: expenseType?.name,
              });
              Atotal += de.paymentDetails.amount;
            }
          });
        }
      });
    }
    if (searchText) {
      let f = [];
      array.forEach((a) => {
        const regexp = new RegExp(`${searchText}`, "ig");
        if (
          a.description.match(regexp) ||
          a.expenseTypeName.match(regexp) ||
          a.householdName.match(regexp) ||
          a.paymentDetails.amount.toString().match(regexp)
        ) {
          f.push(a);
        }
      });
      array = [...f];
    }

    return { array, total: Atotal };
  }

  let domNode = useClickOutside(() => {
    setExpandDailyExpense(false);
    setDailyExp([]);
  });

  const handleShowDetails = (id, dailyExp) => {
    setExpandDailyExpense((prev) => !prev);
    setDailyExp([dailyExp]);
  };
  return (
    <>
      <div className="w-full md:flex justify-between items-center my-3">
        <div className="w-full md:w-1/3 flex items-center shadow rounded-lg overflow-clip px-3">
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
        <div className="w-full md:w-56 py-1">
          {loggedInUser.role === "primary user" ? (
            <label
              htmlFor="role"
              className="flex items-center justify-between  text-sm my-1"
            >
              Select Role:
              <select
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded outline-none focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-[2px] text-xs cursor-pointer"
              >
                <option value="primary user">Primary User</option>
                <option value="member">Member</option>
              </select>
            </label>
          ) : (
            ""
          )}
        </div>
        <span className="block px-2 py-1 my-1 rounded-md shadow">
          Total Daily Expenditure:{" "}
          <span className="text-red-500">
            ₹ {getHouseholdDailyExpenses().total}
          </span>
        </span>
        <div className="flex justify-end">
          <Link
            className="px-2 py-0 bg-[#3F7BDA] text-white rounded-full text-2xl shadow-md"
            to="dailyExpenseForm"
          >
            +
          </Link>
        </div>
      </div>
      {getHouseholdDailyExpenses().array.length === 0 ? (
        <span className="text-lg text-center block">
          No <b>Daily Expenses</b> in the Database...
        </span>
      ) : (
        <div className="h-[calc(100%-150px)] w-full overflow-auto mt-4 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 sticky top-0">
            <thead className="sticky top-0 text-white bg-[#3F7BDA] dark:bg-gray-700 dark:text-gray-400">
              <tr className="sticky top-0 font-nunito">
                <th
                  scope="col"
                  className="sticky top-0 w-[5%] py-2 px-2 font-extralight"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[10%] py-2 px-2 font-extralight"
                >
                  Paid Date
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[20%]  py-2 px-2 font-extralight"
                >
                  Expense Type
                </th>
                <th
                  scope="col"
                  className="sticky w-[25%] top-0 py-2 px-2 font-extralight"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[20%] py-2 px-2 font-extralight"
                >
                  Paid By
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[12%] py-2 px-2 font-extralight"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[8%] py-2 px-2 font-extralight"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm overflow-y-auto ">
              {getHouseholdDailyExpenses().array.map((de, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={de._id}
                >
                  <td
                    scope="row"
                    className=" py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* {index < 10 ? "0" + ++index : ++index}. */}
                    {++index}.
                  </td>
                  <td
                    scope="row"
                    className=" py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(de.paymentDetails.date).getDate() +
                      "/" +
                      new Date(de.paymentDetails.date).getMonth() +
                      "/" +
                      new Date(de.paymentDetails.date).getFullYear()}
                  </td>
                  <td
                    scope="row"
                    className=" py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {de.expenseTypeName}
                  </td>
                  <td
                    scope="row"
                    className=" py-2 px-2  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {de.description}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {de.householdName}
                  </td>
                  <td className="py-2 px-2 text-black">
                    {"₹ " + de.paymentDetails.amount}
                  </td>
                  <td className="py-2 px-2 text-black">
                    <FaEye
                      size={20}
                      className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100 ml-2"
                      onClick={() => handleShowDetails(de._id, de)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PopupModal
        array={dailyExp}
        isPopUpOpen={expandDailyExpense}
        domNode={domNode}
        ExpName={"Daily"}
      />
    </>
  );
};

export default DailyExpenses;
