import {ADD, MAKE_ORDER, ON_SHOW_CHANGE, ORDERS_TO_REDUX, RESET, SUB} from "../actions/actionsType";

const initialState = {
    currentId: 1,
    orders: []
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
        case ON_SHOW_CHANGE: {
            console.log(action.payload, " ORDERS_ACTION")
            let newOrder = {...action.payload, show: !action.payload.show}
            let newState = {...state, orders: [{...state.orders[0], [action.key]:newOrder}]}

            return {
                ...newState,
            }
        }
        default:
            return state
    }
}