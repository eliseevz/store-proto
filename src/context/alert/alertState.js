import React, {useReducer} from "react"
import {AlertContext} from "./alertContext";
import {alertReducer} from "./alertReducer";
import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const AlertState = ({children}) => {

    const [state, dispatch] = useReducer(alertReducer, null)

    const hide = () => dispatch({type: HIDE_ALERT})

    const show = (text, type = "secondary") => {
        console.log(' this is show from alertState')
        dispatch ({
            type: SHOW_ALERT,
            payload: {text, type}
        })
        setTimeout(()=> {
            hide()
        }, 3000)
    }

    const showHandler = (text, type) => {
        return dispatch => {
            console.log("this is hello from dispatch")
            dispatch({type: SHOW_ALERT, payload: {text, type}})
            setTimeout( () => {
                hide()
            }, 3000)
        }
    }

    return (
        <AlertContext.Provider value={{
            hide, show, alert: state
        }}>
            { children }
        </AlertContext.Provider>
    )
}