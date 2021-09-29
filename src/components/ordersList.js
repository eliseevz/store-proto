import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {ON_SHOW_CHANGE} from "../redux/actions/actionsType";
import {OnShowChange} from "../redux/actions/actions";
import moment from "moment";

const OrdersList = (props) => {

    console.log("ORDER LIST: ", props.orders)
    if (!props.orders) {
        return (
            <div className="container p-3">
                <h3>Загрузка</h3>
            </div>
        )
    }


    return (
        <div className="container p-3">
            <h3>Список заказов: </h3>
            {Object.keys(props.orders).length == 1
                ? <h1>У вас еще нет заказов</h1>
                :  Object.keys(props.orders).map( (order, index) => {
                        if (order === "isEmpty") {
                            return null
                        }
                        const orderInfo = props.orders[order].order
                        const styles = {backgroundColor: "#f1f1f1"}
                    // boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.5)"
                        return (
                            <div
                                className="card w-50 mt-3 cursor-pointer"
                                style={ props.orders[order].show ? {margin: "0 auto", ...styles} : {margin: "0 auto"} }
                                key={index}

                            >
                                <div className="card-body d-flex justify-content-between"
                                     role="button"
                                     onClick={() => props.onChangeShow(props.orders[order], order)}
                                >
                                    <span className="d-flex align-items-center">
                                        Order #{"00" + (index+1)}
                                        <span className="date text-muted" style={{fontSize: 12, marginLeft: 10}}>
                                            {moment(props.orders[order].orderDate).format('MMM Do YY, h:mm a')}
                                        </span>
                                    </span>
                                    {props.orders[order].promocode.currentPromocode !== "NULL"
                                        ? `Промокод: ${props.orders[order].promocode.currentPromocode} -${props.orders[order].promocode.sale}%`
                                        : null
                                    }
                                    <div className="d-flex align-items-center">
                                        <span style={{marginRight: 30, textAlign: "left"}}>
                                            { props.orders[order].totalPrice } Р.
                                        </span>
                                        <span className="material-icons" style={ props.orders[order].show ? {transform: "rotate(180deg)"} : null }>
                                            arrow_circle_down
                                        </span>
                                    </div>
                                </div>
                                { props.orders[order].show
                                    ? <div style={{ background: "#eaeaea", padding: 10}}>
                                        {orderInfo.map((item, index) => {
                                            console.log(item, " item from map")
                                            return (
                                                <div style={{marginBottom: 10}} className="card">
                                                    <div className="card-body d-flex align-items-center justify-content-between">
                                                        <div className="main-Info">
                                                            <img style={{height: 45, marginRight: 10}} src={item.imgUrl} alt=""/>
                                                            <span style={{fontSize: 13}}>{item.name}</span>
                                                        </div>
                                                        <div className="details">
                                                            <span style={item.sale ? {textDecoration:"line-through", color: "#787878"} : null} className="m-lg-3"> {item.price * item.count} Р</span>
                                                            { item.sale ? <span className="m-lg-3">{item.price * item.count * (100-item.sale)/100} Р</span> : null }
                                                            <span ><strong>{item.count} шт</strong></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    : null
                                }
                            </div>
                        )
                    })
            }
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state, " this is state from matstatetoprops")

    return {
        orders: state.orders.orders[0]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeShow: (item, key) => dispatch(OnShowChange(item, key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)

