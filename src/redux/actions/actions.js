import {ADD, GET_ITEMS_TO_REDUX, MAKE_ORDER, ON_DELETE, ON_SHOW_CHANGE, RESET, RESET_CART, SUB} from "./actionsType";

export function add(id) {
    return {
        type: ADD,
        payload: id
    }
}

export function sub(id) {
    return {
        type: SUB,
        payload: id
    }
}

export function onDelete(id) {
    return {
        type: ON_DELETE,
        payload: id
    }
}
export function resetCart(name) {
    return {
        type: RESET_CART,
    }
}

export function OnShowChange(item, key) {
    return {
        type: ON_SHOW_CHANGE,
        payload: item,
        key: key
    }
}

export function reset(name) {
    return {
        type: RESET,
        payload: name
    }
}

export function resetOrder() {
    console.log("хуйня resetOrder")
    return {
        type: MAKE_ORDER,
    }
}

export function getItems(items) {
    console.log("getItems")
    return {
        type: GET_ITEMS_TO_REDUX,
        payload: items
    }
}