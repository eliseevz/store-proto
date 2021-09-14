import React from "react"
import {connect} from "react-redux"

const OrdersList = (props) => {

    return (
        <div className="container p-3">
            {props.orders.length === 0
                ? <h1>У вас еще нет заказов</h1>
                :  props.orders.map( (order, index) => {
                        return (
                            <div
                                className="card w-50 mt-3 cursor-pointer"
                                style={{margin: "0 auto"}}
                                // onClick={}
                            >
                                <div className="card-body d-flex justify-content-between">
                                    This is some text within a card body.
                                    <span className="material-icons">
                                        arrow_circle_down
                                    </span>
                                </div>
                                <div >

                                </div>
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
        orders: state.orders.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)

