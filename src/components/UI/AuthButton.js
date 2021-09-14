import React from "react"

const AuthButton = props => {
    const cls = `btn btn-${props.active ? "dark" : "light"} mx-lg-2`
    return (
        <button id={props.type} onClick={props.onClick} type="button" className={cls}>
            {props.children}
        </button>
    )
}

export default AuthButton