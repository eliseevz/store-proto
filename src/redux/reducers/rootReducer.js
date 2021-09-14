import orders from "./orders"
import products from "./products"
import {combineReducers} from "redux"
import authReducer from "./auth";

export default combineReducers({
    products, orders, auth: authReducer
})