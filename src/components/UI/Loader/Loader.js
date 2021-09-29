import React from "react"
import classes from "./Loader.module.css"

const Loader = (props) => {
    return (
        <div style={props.styles} className={classes.Loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader