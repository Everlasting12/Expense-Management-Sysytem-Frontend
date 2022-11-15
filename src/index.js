import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
// import Register from "./screens/Register";
import BasePage from "./screens/BasePage";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./screens/ProtectedRoute";
import MemberDashboard from "./screens/MemberDashboard";
import PrimaryUserDashboard from "./screens/PrimaryUserDashboard";
import AdminDashboard from "./screens/AdminDashboard";

import Contact from "./screens/Contact";
import ExpenseTypes from "./components/ExpenseTypes";
import Users from "./components/Users";
import Household from "./components/Household";
import ExpenseTypesForm, { getExpenseTypeById } from "./components/ExpenseTypesForm";
import ErrorPage from "./ErrrorPage";
import UserForm, { getUserById } from "./components/UserForm";
import Members from "./components/Members";
import HouseholdForm, { getHouseholdById } from "./components/HouseholdForm";
import MemberForm, { getMemberById } from "./components/MemberForm";
import PeriodicPayments from "./components/PeriodicPayments";
import PeriodicExpenseForm, { getPeriodicExpenseById } from "./components/PeriodicExpenseForm";
import DailyExpenses from "./components/DailyExpenses";
import DailyExpenseForm from "./components/DailyExpenseForm";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import Notifications from "./screens/Notifications";
import AccountActivation from "./screens/AccountActivation";

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: < ErrorPage />,
  children: [
    {
      index: true,
      element: <BasePage />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "forgetpassword",
      element: <ForgetPassword />
    },
    {
      path: "exms/resetpassword/reset",
      element: <ResetPassword />,
    },
    {
      path: "exms/activate-account",
      element: <AccountActivation />,
    },

    {
      path: "contact",
      element: <Contact />
    },
    {
      path: "primaryuser",
      element: <ProtectedRoute><PrimaryUserDashboard /></ProtectedRoute>,
      children: [
        {
          index: true,
          element: <Household />
        },
        {
          path: "household",
          element: <Household />
        },
        {
          path: "householdForm",
          element: < HouseholdForm />
        },
        {
          path: "household/householdForm",
          element: < HouseholdForm />
        },
        {
          path: "household/householdForm/:householdId",
          element: <HouseholdForm />,
          loader: getHouseholdById
        },
        {
          path: "household/household/householdForm/:householdId",
          element: <HouseholdForm />,
          loader: getHouseholdById
        },
        {
          path: "allmembers",
          element: <Members />
        },
        {
          path: "allmembers/memberForm",
          element: <MemberForm />,
        },
        {
          path: "allmembers/memberForm/:memberId",
          element: <MemberForm />,
          loader: getMemberById,
        },
        {
          path: "periodicExpenses",
          element: <PeriodicPayments />
        },
        {
          path: "periodicExpenses/periodicExpenseForm",
          element: <PeriodicExpenseForm />
        },
        {
          path: "periodicExpenses/periodicExpenseForm/:periodicExpenseId",
          element: <PeriodicExpenseForm />,
          loader: getPeriodicExpenseById,
        },
        {
          path: "dailyExpenses",
          element: <DailyExpenses />
        },
        {
          path: "dailyExpenses/dailyExpenseForm",
          element: <DailyExpenseForm />
        }
      ]

    },
    {
      path: "member",
      element: <ProtectedRoute><MemberDashboard /></ProtectedRoute>,
      children: [

        {
          index: true,
          element: <BasePage />
        },
        {
          path: "periodicExpenses",
          element: <PeriodicPayments />
        },

        {
          path: "periodicExpenses/periodicExpenseForm/:periodicExpenseId",
          element: <PeriodicExpenseForm />,
          loader: getPeriodicExpenseById,
        },

        {
          path: "dailyExpenses",
          element: <DailyExpenses />
        },
        {
          path: "dailyExpenses/dailyExpenseForm",
          element: <DailyExpenseForm />
        }
      ]

    },
    {
      path: "/admin",
      element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
      children: [
        {
          index: true,
          element: <ExpenseTypes />
        },
        {
          path: "expenseType",
          element: <ExpenseTypes />,

        },
        {
          path: "expenseTypeForm",
          element: <ExpenseTypesForm />
        },
        {
          path: "expenseType/expenseTypeForm/:expenseTypeId",
          element: <ExpenseTypesForm />,
          loader: getExpenseTypeById
        },
        {
          path: "expenseType/expenseTypeForm",
          element: <ExpenseTypesForm />
        },
        {
          path: "expenseType/expenseType/expenseTypeForm/:expenseTypeId",
          element: <ExpenseTypesForm />,
          loader: getExpenseTypeById
        },
        {
          path: "users",
          element: <Users />
        },
        {
          path: "users/userForm/:userId",
          element: <UserForm />,
          loader: getUserById
        },
        {
          path: "notifications",
          element: <Notifications />
        }
      ]
    }
  ]

}])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
