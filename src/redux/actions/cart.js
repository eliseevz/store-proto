import {ADD_TO_CART} from "./actionsType";

export const addToCart = (item, show) => {
    return {
        type: ADD_TO_CART,
        payload: item,
        showMessage: show
    }
}