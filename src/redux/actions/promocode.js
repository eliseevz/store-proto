import {ADD_TO_CART, CHECK_PROMO} from "./actionsType";
import axios from "axios";

export const checkPromo = (code) => {
    return async dispatch => {
        const response = await axios.get("https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/promocodes/current.json")
        console.log(response, " this is response")
        let isCode = 'NULL'
        Object.keys(response.data).forEach(item => {
            if (item === code) {
                isCode = item
            }
        })

        dispatch({
            type: CHECK_PROMO,
            payload: isCode,
            sale: response.data[isCode] || "NULL"
        })

        if (isCode !== "NULL") {
            return true
        } else {
            return false
        }

    }
}