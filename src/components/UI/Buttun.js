import React from "react"

const Button = (props) => {

    const cls = "btn btn-" + props.type

    return (
        <button onClick={props.onClick} type="button" className={cls}>
            {props.children}
        </button>
    )
}

export default Button