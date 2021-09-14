import {ADD, MAKE_ORDER, RESET, SUB} from "./actionsType";

export function add(name) {
    return {
        type: ADD,
        payload: name
    }
}

export function sub(name) {
    return {
        type: SUB,
        payload: name
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