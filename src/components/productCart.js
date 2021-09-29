import React, {useContext, useEffect, useState} from "react"
import {connect} from "react-redux"
import {add, onDelete, reset, resetCart, resetOrder, sub} from "../redux/actions/actions";
import Button from "./UI/Buttun";
import axios from "axios";
import {getOrders} from "../redux/actions/auth";
import {AlertContext} from "../context/alert/alertContext";
import moment from "moment";
import {Link} from "react-router-dom";
import PromoCode from "./promoCode";


const ProductCart = (props) => {

    const {show} = useContext(AlertContext)

    const [totalPrice, setTotalPrice] = useState(0)

    const getTotalPrice = () => {
        let newPrice = 0
        props.cart.forEach( item => newPrice += item.price * item.count * (item.sale ? (100-item.sale)/100 : 1))
        setTotalPrice(newPrice)
    }

    useEffect(() => {
        getTotalPrice()
    }, [props.cart])

    const  makeOrder = async (order) => {
        try {
            const response = await axios.get("https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users.json")
            const responseData = response.data
            let userAuthId
            Object.keys(responseData).forEach(userId => {
                if (responseData[userId].userId === props.user.userId) {
                    userAuthId = userId
                }
            })

            const newOrder = {...order}

            const sale = props.promocode.currentPromocode !== "NULL" ? props.promocode.sale : 0

            const orderId = responseData[userAuthId].orders.currentId

            const postOrderData = {
                order: {...newOrder},
                show: false,
                orderDate: new Date(),
                totalPrice: totalPrice * (100 - sale) / 100,
                promocode: props.promocode
            }

            const postOrder = await axios.post(`https://online-store-prototype-c73d8-default-rtdb.firebaseio.com/users/${userAuthId}/orders.json`, postOrderData)
            props.gerOredersAfterBuy(localStorage.getItem("userId"))
            props.onResetCart()
            show("Заказ успешно оформлен, перейдите в Orders, чтобы узнать детали", "success", 5000)
        } catch (e) {
            console.log("this is error: ", e)
        }
    }

    if (props.cart.length === 0) {
        return (
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="alert alert-warning alert-dismissible fade show col-sm-6" role="alert">
                        <strong>Cart is empty</strong> <Link style={{textDecoration: "none"}} to="/">go shop now</Link> to fix it!
                    </div>
                </div>
            </div>
        )
    } else return (<div className="container mt-5 p-3">
        { props.cart.map( (item, index) => {
                return (
                    <div className="row d-flex justify-content-center mb-3">
                        <div className="card col-sm-8">
                            <div className="card-body d-flex align-items-center justify-content-between" style={{height: 100}}>
                                <div className="info">
                                    <img src={`${item.imgUrl}`} style={{height: 100}} alt=""/>
                                    <span style={{marginLeft: 10}}> { item.name } </span>
                                </div>
                                {item.size ? <span style={{width: 90}} className="badge bg-dark">размер: {item.size}</span> : <span style={{width: 100}}></span>}
                                <div className="prices d-flex align-items-center">
                                    <span style={item.sale ? {textDecoration: "line-through", marginRight: 10, color: "#787878"} : null}>{item.price * item.count} Р.</span>
                                    { item.sale ? <span> {item.price * item.count * (100-item.sale)/100} Р</span> : null }
                                </div>
                                <div className="params d-flex align-items-center">
                                    <div className="counter m-lg-3">
                                        <Button onClick={() => props.onAdd(item.id)} type="light">+</Button>
                                        <span style={{padding: "0 5px", fontSize: 19}}> { item.count } </span>
                                        <Button onClick={() => props.onSub(item.id)} type="light">-</Button>
                                    </div>
                                    <Button
                                        onClick={()=> props.onDelete(item.id)}
                                        type="danger"
                                    >
                                        &times;
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        <PromoCode>

        </PromoCode>
        <div style={{display: "block", fontSize: 16, color: "#000", margin: "0 auto", border: "1px solid #a3a3a3"}} className="badge bg-light p-3 mb-3 col-sm-6 d-flex justify-content-center">
            total price: { props.promocode.currentPromocode !== "NULL"
            ? <div> <span style={{color: "#787878" ,textDecoration: "line-through", marginRight: 5, marginLeft: 5}}> {totalPrice} Р</span> {totalPrice * (100 - props.promocode.sale) / 100} </div>
            : totalPrice
        } Р
        </div>
        <Button
            type="success"
            onClick={() => {
                    makeOrder(props.cart)
                }
            }
        >
            Оформить заказ
        </Button>
    </div>)
}


const mapStateToProps = (state) => {
    return {
        store: state.products.store,
        isEmpty: state.products.isEmpty,
        orders: state.orders.orders,
        user: state.auth.user,
        cart: state.cart.cart,
        promocode: state.promocode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (id) => dispatch(add(id)),
        onSub: (id) => dispatch(sub(id)),
        onDelete: (id) => dispatch(onDelete(id)),
        gerOredersAfterBuy: (userId) => dispatch(getOrders(userId)),
        onResetCart: () => ( dispatch(resetCart()) )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCart)
