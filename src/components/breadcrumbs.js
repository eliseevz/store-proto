import React from "react"
import {Link} from "react-router-dom";

const BreadCrumbs = (props) => {
    return (
        <div className="d-flex align-items-center">
            <Link style={{textDecoration: "none", textTransform: "uppercase"}} className="text-dark" to="/">Главная</Link>
            <span style={{fontSize: 20}} className="material-icons text-muted">
                keyboard_arrow_right
            </span>
            <span className="text-muted">{ props.product.name }</span>
        </div>
    )
}

export default BreadCrumbs