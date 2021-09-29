import React, {useState} from "react"
import classes from "./dropDown.module.css"

const DropDown = (props) => {
    const {options:entryOptions, action, isCorrect = true} = props

    let options = {}

    console.log("ENTRY OPTIONS: ", entryOptions)

    if (!isCorrect) {
        console.log("ХУЙ")
        let newOptions = {}
        Object.keys(entryOptions).map(item => {
            const newItem = {label: entryOptions[item]}
            if (item !== "default") {
                newOptions = {...newOptions, [item]: {...newItem}}
            }
        })
        options = {...newOptions}
    } else {
        console.log("here")
        options = {...entryOptions}
    }

    console.log("FORMATED OPIONS: ", options)

    const [prop, setProps] = useState({selected: options.default || entryOptions.default.label ,isOpen: false})

    const openHandler = () => {
        const newState = {...prop, isOpen: !prop.isOpen}
        setProps(newState)
    }

    const selectHandler = (item) => {
        const newState = {...prop, selected: item, isOpen: false}
        action(item)
        setProps(newState)
    }

    return (
        <div style={{width: 160}} className="dropDown position-relative">
            <button style={{width: 160, fontSize: 14}} onClick={openHandler} className="btn btn-dark d-flex align-items-center justify-content-center">
                {prop.selected.label || prop.selected }
                <span className="material-icons">
                    {prop.isOpen ? "expand_less" : "expand_more"}
                </span>
            </button>
            { prop.isOpen
            ? <ul className={`position-absolute ${classes.dropDownList}`}>
                    { Object.keys(options).map( optionName => {

                        return <li
                            className={`${classes.dropDown_item} ${prop.selected.label === options[optionName].label ? `${classes.selected}` : ""}`}
                            onClick={()=> {
                                action(options[optionName])
                                selectHandler(options[optionName])
                            }}
                        >
                            { options[optionName].label }
                        </li>
                    }) }
                </ul>
            : null
            }

        </div>
    )
}

export default DropDown