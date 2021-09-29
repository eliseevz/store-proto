import React, {useEffect, useState} from "react"
import is from "is_js"
import axios from "axios"
import {connect} from "react-redux";
import Auth, {login} from "../../redux/actions/auth";

const Registration = (props) => {

    const initState = {
        formControls: {
            email: {
                value: "",
                label: "Email",
                type: "email",
                errorMessage: "Введите корректный Email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: "",
                label: "Password",
                type: "password",
                errorMessage: "Пароль должен быть длиннее 6 символов",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }


    const [state, setState] = useState(initState)

    const renderInputs = () => {
        const inputs = Object.keys(state.formControls).map( (controlName, index ) => {
            const htmlFor = controlName + "_" + Math.random()
            const input = state.formControls[controlName]
            return (
                <div key={index} className="mb-3">
                    <label htmlFor={htmlFor} className="form-label">{input.label}</label>
                    <input
                        value={input.value}
                        required={input.required} type="email"
                        className="form-control" id={htmlFor}
                        aria-describedby="emailHelp"
                        onChange={(event => onChangeHandler(event, controlName))}
                    />
                    {(input.valid || !input.touched)
                        ? null
                        : <div id="emailHelp" className="form-text text-danger">{input.errorMessage}</div>
                    }
                </div>
            )
        })

        return inputs
    }

    const validateControl = (value, validation) => {
        if (!value) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = {...state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls[controlName] = control

        setState({
            formControls
        })
    }

    const registerHandler = (event) => {
        event.preventDefault()
        if (state.formControls.email.valid && state.formControls.password.valid) {
            props.auth(state.formControls.email.value, state.formControls.password.value, props.onSuccessReg)
            setState(initState)
            console.log("Валидация успешна")
        }
    }

    return (
        <>
            <h1 className="text-center">Регистрация</h1>
            <form style={{width: 300}} className=" m-auto mt-5">
                { renderInputs() }
                <button onClick={(event => registerHandler(event))} type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
        </>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, show) => dispatch(Auth(email,password, show)),
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Registration)