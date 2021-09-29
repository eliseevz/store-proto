import {ADD, ADD_TO_CART, ON_DELETE, RESET_CART, SUB} from "../actions/actionsType";

const initialState = {
    cart: []
}

export default function cart(state = initialState, action) {

    switch (action.type) {
        case ADD_TO_CART: {
            const payload = {...action.payload, count: 1}
            console.log(state.cart, " this is cart from add to cart")
            let findResult = undefined
            if (state.cart.length !== 0) {
                findResult = state.cart.find((item => {
                    if (item.articul === payload.articul && item.size === payload.size) {
                        return true
                    }
                }))
                console.log(findResult, " findResult")
            }
            if (!findResult) {
                return {
                    ...state,
                    cart: [...state.cart, payload]
                }
            } else {
                console.log("ТОВАР УЖЕ ЕСТЬ В КОРЗИНЕ")
                action.showMessage("товар уже есть в корзине", "danger")
                return {
                    ...state,
                }
            }
        }
        case ADD: {
            const newState = state.cart.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item, count: item.count + 1
                    }
                }
                return item
            })
            return {
                ...state,
                cart: [...newState]
            }
        }
        case SUB: {
            const newState = state.cart.map(item => {
                if (item.id === action.payload) {

                    return {
                        ...item, count: item.count - 1 === 0 ? item.count : item.count - 1
                    }
                }
                return item
            })
            return {
                ...state,
                cart: [...newState]
            }
        }
        case RESET_CART:
            return {
                ...initialState
            }
        case ON_DELETE: {
            const newOrder = state.cart.filter(item => (item.id !== action.payload))
            console.log(newOrder)
            return {
                ...state,
                cart: [...newOrder]
            }
        }
        default:
            return state
    }
}