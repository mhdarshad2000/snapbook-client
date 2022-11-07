import {combineReducers} from "redux"
import { adminReducer } from "./adminReducer"
import  {userReducer} from "./userReducer"

const rootReducer = combineReducers({
    user:userReducer,
    admin:adminReducer,
})

export default rootReducer