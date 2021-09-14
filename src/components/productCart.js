import React from "react"
import {connect} from "react-redux"
import {add, reset, resetOrder, sub} from "../redux/actions/actions";
import Button from "./UI/Buttun";
import axios from "axios";


const ProductCart = (props) => {

    const  makeOrder = async (order) => {
        try {
        const response = await axios.get("https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users.json")
        const responseData = response.data
        let userAuthId
        Object.keys(responseData).forEach(userId => {
            if (responseData[userId].userId === props.user.userId) {
                userAuthId = userId
                console.log("НАЙДЕН НАХУЙ", responseData[userId])
            }
        })
        const newOrder = order.filter(item => {
            if (item.count !== 0) {
                return item
            }
        })

        const orderId = responseData[userAuthId].orders.currentId

        const postOrder = await axios.post(`https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users/${userAuthId}/orders.json`, {id: orderId, order: {...newOrder}})
        } catch (e) {
            console.log("this is error: ", e)
        }
    }

    console.log(props, " this is props from ProductCart")
    if (props.isEmpty) {
        return (
                <h1>Корзина пуста</h1>
        )
    } else return (<div className="container">
        { props.store.map( (item, index) => {
            if (item.count !== 0 ) {
                return (
                    <div key={index} className="card mb-3 mt-1">
                        <div className="card-body d-flex justify-content-between">
                            <span>{item.name}</span>
                            <div className="counter" style={{fontSize: 23}}>
                                <button onClick={()=> props.onSub(item.name)} className="badge bg-dark" >-</button>
                                <button onClick={()=> props.onAdd(item.name)} className="badge bg-dark">+</button>
                                <span className="m-lg-5" style={{fontSize: 23}}>{item.count}</span>
                            </div>
                        </div>
                    </div>
                )
            }
            return null
        }) }
        <Button
            type="success"
            onClick={() => {
                makeOrder(props.store)
                props.resetOrder()
            }
            }
        > Оформить заказ </Button>
    </div>)
}


const mapStateToProps = (state) => {
    return {
        store: state.products.store,
        isEmpty: state.products.isEmpty,
        orders: state.orders.orders,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onAdd: (name) => dispatch(add(name, state)),
        onSub: (name) => dispatch(sub(name, state)),
        resetOrder: () => dispatch(resetOrder())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCart)
