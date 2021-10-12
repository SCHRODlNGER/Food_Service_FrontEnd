import { combineReducers } from "redux";
import UserReducer from "./userAccount/userAccountReducer";

const rootReducer = combineReducers({
    UserReducer: UserReducer
})

export default rootReducer