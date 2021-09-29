import React from "react"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux";

const Navigation = (props) => {

    let navSrc

    if (props.auth.isLogin) {
        navSrc = (
            <ul className="nav nav-pills justify-content-center bg-dark">
                <li className="nav-item m-lg-1">
                    <NavLink className="nav-link text-light" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item m-lg-1 position-relative">
                    <NavLink className="nav-link text-light" to="/cart">Cart</NavLink>
                    <span className="d-flex justify-content-center align-items-center" style={{position: "absolute", top: 0, right: 0, background: "red", borderRadius: "100%", width: "20px", height: "20px", fontSize: 11, color: "#fff"}}>
                        {props.cart.length}
                    </span>
                </li>
                <li className="nav-item m-lg-1">
                    <NavLink className="nav-link text-light" to="/orders">Orders</NavLink>
                </li>
                <li className="nav-item m-lg-1">
                    <NavLink className="nav-link text-light" to="/auth">Profile</NavLink>
                </li>
                { props.auth.isAdmin
                ? <li className="nav-item m-lg-1">
                        <NavLink className="nav-link text-light" to="/admin">Admin</NavLink>
                    </li>
                : null
                }
            </ul>
        )
    } else {
        navSrc = (
            <ul className="nav nav-pills justify-content-center bg-dark">
                <li className="nav-item m-lg-1">
                    <NavLink className="nav-link text-light" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item m-lg-1">
                    <NavLink className="nav-link text-light" to="/auth">Auth here</NavLink>
                </li>
            </ul>
        )
    }

    return (
        navSrc
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(Navigation)