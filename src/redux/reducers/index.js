import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer"
import { expenseTypesReducer } from "./expenseTypesReducer"
import { usersReducer } from "./usersReducer"
import { householdReducer } from "./householdReducer"
import { membersReducer } from "./membersReducer"
import { periodicExpenseReducer } from "./periodicExpenseReducer"
import { dailyExpenseReducer } from "./dailyExpenseReducer"
import { notificationReducer } from "./notificationReducer"

export default combineReducers({
    loginReducer,
    expenseTypesReducer,
    usersReducer,
    householdReducer,
    membersReducer,
    periodicExpenseReducer,
    dailyExpenseReducer,
    notificationReducer
})