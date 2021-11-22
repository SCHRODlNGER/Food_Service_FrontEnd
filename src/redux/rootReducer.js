import { combineReducers } from "redux";
import UserAuthReducer from "./userAccount/userAccountReducer";
import UserReducer from "./commonServices/User/UserReducer"
import CommonDataReducer from "./commonServices/data/DataReducer"
import CartReducer from "./Cart/CartReducer";

const rootReducer = combineReducers({
    UserAuthReducer: UserAuthReducer,
    UserReducer: UserReducer,
    CommonReducer: CommonDataReducer,
    CartReducer: CartReducer,
})

export default rootReducer