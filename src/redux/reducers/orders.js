import {ADD, MAKE_ORDER, ORDERS_TO_REDUX, RESET, SUB} from "../actions/actionsType";
import {act} from "@testing-library/react";

const initialState = {
    currentId: 1,
    orders: [
        // {
        //     id: "0001",
        //     products: [
        //         {name: "Яблоко", count: 2},
        //         {name: "Молоко", count: 5},
        //     ],
        //     orderDate: "02.21.2021",
        //     orderTime: "15:53",
        // }
    ]
}

export default function orders(state = initialState, action) {

    switch (action.type) {
        case ORDERS_TO_REDUX: {
            console.log("hello from  ORDERS_TO_REDUX REDUCER")
            return {
                ...state,
                orders: [action.payload]
            }
        }
        default:
            return state
    }
}