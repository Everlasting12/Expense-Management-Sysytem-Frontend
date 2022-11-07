import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { MdOutlineEdit, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllHouseholdForCurrentPrimaryUserAction } from "../redux/actions/householdsAction";
import { getloggedInUserDetails } from "../redux/actions/loginAction";
import { getAllPeriodicExpenseAction } from "../redux/actions/periodicExpenseAction";
import PopupModal from "./common/PopupModal";

const frequency = [
  { title: "Yesterday", date: 1 * 86400000 },
  { title: "Today", date: 0 },
  { title: "Last 7 days", date: 7 * 86400000 },
  { title: "Last month", date: 31 * 86400000 },
  { title: "Last 6 months", date: 183 * 86400000 },
  { title: "Last year", date: 365 * 86400000 },
];

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

const PeriodicPayments = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loginReducer.user);
  const members = useSelector((state) => state.membersReducer.members);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [role, setRole] = useState(loggedInUser.role);

  const [expandPeriodicExpense, setExpandPeriodicExpense] = useState(false);
  const [periodicExp, setPeriodicExp] = useState([]);

  useEffect(() => {
    dispatch(getAllPeriodicExpenseAction());
  }, []);
  useEffect(() => {
    getPeriodicExpensesPerHouseholds();
  }, [searchText]);
  useEffect(() => {
    getPeriodicExpensesPerHouseholds();
  }, [filter]);
  useEffect(() => {
    role === "member"
      ? dispatch(getAllHouseholdForCurrentPrimaryUserAction("", ""))
      : dispatch(
          getAllHouseholdForCurrentPrimaryUserAction(loggedInUser._id, "")
        );
  }, [role]);

  const periodicExpenses = useSelector(
    (state) => state.periodicExpenseReducer.periodicExpenses
  );
  const households = useSelector((state) => state.householdReducer.households);
  const expenseTypes = useSelector(
    (state) => state.expenseTypesReducer.expenseTypes
  );
  function getPeriodicExpensesPerHouseholds() {
    let array = [];

    if (role === "primary user") {
      households.forEach((h, index) => {
        periodicExpenses.forEach((pe, index) => {
          if (pe.household === h._id) {
            const expenseType = expenseTypes.find(
              (et) => et._id === pe.expensetype
            );
            if (expenseType) {
              array.push({
                ...pe,
                expensetype: expenseType.name,
                expenseTypeId: expenseType._id,
                householdName: h.name,
              });
            }
          }
        });
      });
    } else if (role === "member") {
      members.forEach((m) => {
        if (m.user === loggedInUser._id) {
          periodicExpenses.forEach((pe, index) => {
            if (m.household === pe.household) {
              const household = households.find((h) => h._id == pe.household);
              const expenseType = expenseTypes.find(
                (et) => et._id === pe.expensetype
              );
              array.push({
                ...pe,
                householdName: household?.name,
                expensetype: expenseType.name,
              });
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
          a.expensetype.match(regexp) ||
          a.householdName.match(regexp) ||
          a.description.match(regexp)
        ) {
          f.push(a);
        }
      });
      array = [...f];
    }
    if (filter) {
      let f = [];

      array.forEach((a) => {
        switch (filter.split("|")[0]) {
          case "Today":
            if (
              filter.split("|")[1].split("T")[0] ==
              a.paymentDetails[0]?.date.split("T")[0]
            ) {
              f.push(a);
            }
            break;
          case "Yesterday":
            if (
              filter.split("|")[1].split("T")[0] ==
              a.paymentDetails[0]?.date.split("T")[0]
            ) {
              f.push(a);
            }
            break;

          case "Last 7 days":
            if (filter.split("|")[1] <= a.paymentDetails[0]?.date) f.push(a);
            break;
          case "Last month":
            if (filter.split("|")[1] <= a.paymentDetails[0]?.date) f.push(a);
            break;
          case "Last 6 months":
            if (filter.split("|")[1] <= a.paymentDetails[0]?.date) f.push(a);
            break;
          case "Last year":
            if (filter.split("|")[1] <= a.paymentDetails[0]?.date) f.push(a);
            break;
          default:
            f.push(a);
            break;
        }
      });
      array = [...f];
    }

    return array;
  }

  let domNode = useClickOutside(() => {
    setExpandPeriodicExpense(false);
    setPeriodicExp([]);
  });

  const handleShowDetails = (id, periodicExp) => {
    setExpandPeriodicExpense((prev) => !prev);
    setPeriodicExp([periodicExp]);
  };

  return (
    <>
      <div className="w-full md:flex md:justify-between md:items-center my-3">
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
        <div className="w-full md:w-56">
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
        <div className="w-full md:w-48">
          <label
            htmlFor="frequency"
            className="flex items-center justify-between  text-sm my-1"
          >
            Filter
            <select
              name="frequency"
              id="frequency"
              className="bg-gray-50 border-2 border-gray-300 text-gray-900  rounded outline-none focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-[2px] text-xs cursor-pointer"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="">All Expenses</option>
              {frequency.map((freq) => {
                return (
                  <option
                    // value={new Date(Date.now() - freq.date).toISOString()}
                    value={
                      freq.title +
                      "|" +
                      new Date(Date.now() - freq.date).toISOString()
                    }
                    key={freq.title}
                  >
                    {freq.title}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="flex justify-end pt-1">
          {role === "primary user" ? (
            <Link
              className="px-2 py-0 bg-[#3F7BDA] text-white rounded-full text-2xl shadow-md"
              to="periodicExpenseForm"
            >
              +
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      {getPeriodicExpensesPerHouseholds().length === 0 ? (
        <span className="text-lg text-center block">
          No <b>Periodic Expenses</b> in the Database...
        </span>
      ) : (
        <div className="h-[calc(100%-150px)] w-full overflow-auto mt-4 ">
          <table className="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 text-white bg-[#3F7BDA] dark:bg-gray-700 dark:text-gray-400">
              <tr className="sticky top-0 font-nunito">
                <th
                  scope="col"
                  className="sticky w-[5%] top-0 py-2 px-6 font-extralight"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[15%]  py-2 px-6 font-extralight"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[20%]  py-2 px-6 font-extralight"
                >
                  Expense Type
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[30%]  py-2 px-6 font-extralight"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[20%] py-2 px-6 font-extralight"
                >
                  Household
                </th>
                <th
                  scope="col"
                  className="sticky top-0 w-[10%] py-2 px-6 font-extralight"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {getPeriodicExpensesPerHouseholds().map((pe, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={pe._id}
                >
                  <td className=" py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {++index}
                  </td>
                  <td className=" py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {new Date(pe.dueDate).getDate() +
                      "/" +
                      (new Date(pe.dueDate).getMonth() + 1) +
                      "/" +
                      new Date(pe.dueDate).getFullYear()}
                  </td>
                  <td
                    // style={{ wordWrap: "break-word" }}
                    // break-words
                    // break-normal
                    className=" py-2 px-6 font-medium   text-gray-900  dark:text-white"
                  >
                    {pe.expensetype}
                  </td>
                  <td className="py-2 px-6 break-words font-medium text-gray-900  dark:text-white">
                    {pe.description}
                  </td>
                  <td className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {/* {pe.paidBy.map((name, index) => {
                      if (pe.paidBy.length - 1 === index) {
                        return (
                          <span className="mr-1" key={index}>
                            {name}
                          </span>
                        );
                      } else {
                        return (
                          <span className="mr-1" key={index}>
                            {name},
                          </span>
                        );
                      }
                    })} */}
                    {pe.householdName}
                  </td>
                  <td className=" py-3 px-2 flex justify-center ">
                    <Link to={`periodicExpenseForm/${pe._id}`}>
                      <MdOutlineEdit
                        size={20}
                        className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
                      />
                    </Link>

                    <FaEye
                      size={20}
                      className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100 ml-2"
                      onClick={() => handleShowDetails(pe._id, pe)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PopupModal
        array={periodicExp}
        isPopUpOpen={expandPeriodicExpense}
        ExpName={"Periodic"}
        domNode={domNode}
      />
    </>
  );
};

export default PeriodicPayments;
