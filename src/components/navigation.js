import React from "react"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux";

const Navigation = (props) => {

    let navSrc

    if (props.auth.isLogin) {
        navSrc = (
            <ul className="nav nav-pills justify-content-center bg-dark">
                <li className="nav-item">
                    <NavLink className="nav-link text-light"  to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/cart">Cart</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/orders">Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/auth">Auth here</NavLink>
                </li>
            </ul>
        )
    } else {
        navSrc = (
            <ul className="nav nav-pills justify-content-center bg-dark">
                <li className="nav-item">
                    <NavLink className="nav-link text-light"  to="/">Home</NavLink>
                </li>
                <li className="nav-item">
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
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Navigation)