import {CHECK_PROMO} from "../actions/actionsType";

const initialState = {
    currentPromocode: "NULL"
}

export default function promocode (state = initialState, action) {
    switch (action.type) {
        case CHECK_PROMO: {
            console.log("CHECK PROMO")
            return {
                ...state,
                currentPromocode: action.payload,
                sale: action.sale
            }
        }
        default:
            return state
    }
}