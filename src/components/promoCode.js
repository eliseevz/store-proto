import React, {useState} from "react"
import {connect} from "react-redux";
import {checkPromo} from "../redux/actions/promocode";
import Loader from "./UI/Loader/Loader";
import {login} from "../redux/actions/auth";

const PromoCode = (props) => {

    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState(props.promocode.currentPromocode !== "NULL" ? {text: "Промокод успешно применен", type: "success"} : "")
    const [inputValue, setInput] = useState(props.promocode.currentPromocode !== "NULL" ? props.promocode.currentPromocode : "")

    const onOpenHandler = () => {
        setOpen(!isOpen)
    }

    const onChangeInputHandler = (e) => {
        setInput(e.target.value)
    }

    const onCheckHandler = (event) => {
        event.preventDefault()
        const promocode = event.target.previousSibling.value
        if (promocode.trim().length === 0) {
            setMessage({text: "Поле не может быть пустым", type: "danger"})
        } else {
            setMessage({text: (<Loader styles={{marginTop: 0, transform: "scale(0.5)"}}/>), type: "danger" })
            const result = props.onCheckPromocode(promocode)
            result.then(item => {
                if (item) {
                    setMessage({text: "Промокод успешно применен", type: "success"})
                    setInput(promocode)
                } else {
                    setMessage({text: "Такого промокода нет :(", type: "danger"})
                }
            })
        }
    }

    console.log(props.promocode);
    return (
        <div className="row d-flex justify-content-center m-3">
            <div role="button" className='card col-sm-6'>
                <div className="card-body">
                    <div onClick={onOpenHandler} className="card-info d-flex justify-content-center align-self-center">
                        <h8 style={{margin: 0}}>Do you have promocode?</h8>
                        <span className="material-icons ms-3 d-flex justify-content-center align-self-center" style={ isOpen ? {transform: "rotate(180deg)"} : null }>
                            arrow_circle_down
                        </span>
                    </div>
                    {
                        isOpen
                        ? <form action="submit">
                                <div className="input-group justify-content-center mt-4 mb-3">
                                    <input
                                        value={inputValue}
                                        onChange={(e) => onChangeInputHandler(e)}
                                        style={{flex: "none", width: 150}}
                                        type="text" className="form-control promo-input align-self-center"
                                        placeholder="promocode"
                                        aria-label="Recipient's username" aria-describedby="button-addon2"
                                    />
                                    <button onClick={(e) => onCheckHandler(e)} className="btn bg-dark btn-outline-secondary" type="submit" id="button-addon2">
                                        Check
                                    </button>
                                </div>
                                { message ? <div style={{display: "block", fontSize: 13}} className={`text-${message.type}`}> {message.text} </div> : null }
                            </form>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        promocode: state.promocode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckPromocode: (code) => dispatch(checkPromo(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoCode)