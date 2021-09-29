import orders from "./orders"
import products from "./products"
import {combineReducers} from "redux"
import authReducer from "./auth"
import cart from "./cart"
import promocode from "./promocode";

export default combineReducers({
    products, orders, auth: authReducer, cart, promocode
})