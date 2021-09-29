import {ADD, GET_ITEMS_TO_REDUX, MAKE_ORDER, RESET, SUB} from "../actions/actionsType";

const initialState = {
    isEmpty: true,
    store: [],
}

export default function orders(state = initialState, action) {

    switch (action.type) {
        case ADD: {
            return {
                ...state,
                isEmpty: emptyHandler(addHandler(state, action)),
                store: [...addHandler(state, action)]
            }
        }
        case SUB:
            return {
                ...state,
                isEmpty: emptyHandler(subHandler(state, action)),
                store: [...subHandler(state, action)]
            }
        case RESET:
            return {
                ...state,
                isEmpty: emptyHandler(state.store),
                store: [...resetHandler(state, action)]
            }
        case MAKE_ORDER: {
            console.log("хуйня")
            return {
                ...initialState
            }
        }
        case GET_ITEMS_TO_REDUX:
            return {
                ...state,
                store: action.payload
            }
        default:
            return state
    }
}

function addHandler(state, action) {
    const NewStore = state.store.map( item => {
        if (item.name == action.payload) {
            console.log("RETURNED")
            return {
                ...item,
                count: item.count + 1
            }
        }
        return item
    })
    return NewStore
}

function subHandler(state, action) {
    const NewStore = state.store.map( item => {
        if (item.name == action.payload && item.count - 1 >= 0) {
            console.log("RETURNED")
            return {
                ...item,
                count: item.count - 1
            }
        }
        return item
    })
    return NewStore
}

function resetHandler(state, action) {
    const NewStore = state.store.map( item => {
        if (item.name == action.payload && item.count - 1 >= 0) {
            console.log("RETURNED")
            return {
                ...item,
                count: 0
            }
        }
        return item
    })
    return NewStore
}

function emptyHandler(store) {
    let result = true
    console.log("hello " ,store)
    store.forEach( product => {
        if (product.count !== 0) {
            console.log("is srabotal")
            result = false
        }
    })
    console.log(result)
    return result
}