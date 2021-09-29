import React from "react"
import {connect} from "react-redux";
import Logout from "./Logout";
import {Link} from "react-router-dom";


const Profile = (props) => {
    return (
        <div className="row d-flex justify-content-center">
            <div className="card col-sm-5 text-center">
                <div className="card-header d-flex align-items-center justify-content-center">
                    <span className="material-icons m-lg-1">
                        account_circle
                    </span>
                    { props.user.email }
                </div>
                <div className="card-body">
                    <h5 className="card-title">Welcome to our e-store</h5>
                    <p className="card-text">There are some settings, but they are disabled now...</p>
                    <div className="buttonSettings d-flex flex-column justify-content-center align-items-center">
                        <button href="#" disabled className="btn btn-primary mb-3">Profile settings</button>
                        <button href="#" disabled className="btn btn-primary mb-3">Payment methods</button>
                        <Logout>Logout</Logout>
                    </div>

                </div>
                <div className="card-footer text-muted">
                    <Link className="text-muted" style={{textDecoration: "none"}} to="/">Go shop now</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Profile)