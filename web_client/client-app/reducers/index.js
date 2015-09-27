import {combineReducers} from "redux";
import users from "./users";
import notifications from "./notifications";
import account from "./account";

const rootReducer = combineReducers({
	users, notifications, account
});

export default rootReducer;
