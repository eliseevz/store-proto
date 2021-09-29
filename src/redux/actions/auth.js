import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS, GET_USER_INFO, ORDERS_TO_REDUX} from "./actionsType";
import React, {useContext} from "react";
import {AlertContext} from "../../context/alert/alertContext";

export default function Auth(email, password, show) {
    return async dispatch => {
        try {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiRmQAjj4m-4K6AbMw_Y-pssvLXHPlo-s", authData)
            console.log(response, "this is repsonst of auth!")
        const newUserData = {
            userId: response.data.localId,
            email,
            password,
            orders: {
                isEmpty: true,
            },
            username: null,
            isAdmin: false
        }
            const response2 = await axios.post("https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users.json", newUserData)
            show("Регистрация прошла успешно!", "success")
            dispatch(login(email, password))
        } catch (e) {
            console.log({...e}, " this")
            show("Такой пользователь уже есть", "danger")
        } finally {

        }
    }
}

export function login(email, password) {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiRmQAjj4m-4K6AbMw_Y-pssvLXHPlo-s", authData)
        const data = response.data

        console.log("login data: ", data)

        const expirationDate = new Date(new Date().getTime() + data.expiresIn)

        localStorage.setItem("token", data.idToken)
        localStorage.setItem("userId", data.localId)
        localStorage.setItem("expirationDate", expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
        await getUserToRedux(dispatch, data.localId)
        dispatch(getOrders(data.localId))
    }
}

export async function getUserToRedux(dispatch, userId) {
    const response = await axios.get("https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users.json")
    let user
    const userData = Object.keys(response.data).forEach( userKey => {
        if (response.data[userKey].userId === userId) {
            user = response.data[userKey]
        }
    })

    dispatch({
        type: GET_USER_INFO,
        payload: user
    })
}

export const getOrders = (userId) => {
    return async dispatch => {
        console.log("hello from getOrders")
        let user
        const response = await axios.get("https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users.json")
        const userData = Object.keys(response.data).forEach( userKey => {
            if (response.data[userKey].userId === userId) {
                user = response.data[userKey]
            }
        })
        const orders = user.orders
        console.log(user, orders)
        dispatch( {
            type: ORDERS_TO_REDUX,
            payload: orders
        })
    }
}


export function autoLogout(time) {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("expirationDate")
    return {
        type: AUTH_LOGOUT
    }
}


export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
