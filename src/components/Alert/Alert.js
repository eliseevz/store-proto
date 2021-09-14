import React, {useContext} from "react"
import classes from "./Alert.module.css"
import {AlertContext} from "../../context/alert/alertContext";

const iconsType = {
    success: (<span className="material-icons"> check_circle </span>),
    danger: (<span className="material-icons">dangerous</span>)
}

const Alert = () => {

    const {alert} = useContext(AlertContext)

    if (!alert) return null

    return (
        <div className={`${classes.myAlert} alert alert-${alert.type} d-flex align-items-center`} role="alert">
            {iconsType[alert.type]}
            <div>
                {alert.text}
            </div>
        </div>
    )
}

export default Alert