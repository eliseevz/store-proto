import React from "react"
import {connect} from "react-redux";
import {logout} from "../redux/actions/auth";

const Logout = (props) => {
    return <button onClick={props.logout} className="btn btn-danger">Выйти</button>
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)