import React, {useContext} from "react"
import classes from "./itemCard.module.css"
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"
import {AlertContext} from "../../context/alert/alertContext";
import DropDown from "../DropDown/dropDown";

const ItemCard = ({onClick = null, addToCart, selectedCategory = "Все", item}) => {

    const history = useHistory()

    const {show} = useContext(AlertContext)

    const linkHandler = (event) => {
        if (!event.target.id) {
            history.push(`/${item.articul}`);
            if (onClick) {
                onClick(item)
            }
        }
    }

    const {name, imgUrl, price, type, sizes = null, sale} = item

    console.log(sizes, " this is sizes")

    if (selectedCategory === "Все" || type === selectedCategory) {
        return (
            <div role="button" onClick={(event) => linkHandler(event)} className={`${classes.itemCard} card col-sm-2 ms-2 mb-5`} style={{maxWidth: "640px", marginRight: "2px", marginBottom: "40px"}}>
                <div className="row g-0 d-flex flex-column position-relative">
                    {sale ? <span className={`${classes.saleLabel}`}> -{sale}% </span> : null}
                    <div className="col-md-12">
                        <img src={imgUrl} className="img-fluid rounded-start" style={{width: "100%"}} alt={name}/>
                    </div>
                    <div className="col-md-12">
                        <div className={`${classes.cardInfo} card-body position-relative`}>
                            <span className={`${classes.itemName} card-title`}>{name}</span>
                            <div className={`${classes.priceAndCard} d-flex justify-content-center align-items-center`}>
                                <h3 className={`${classes.itemPrice} card-title ${sale ? `${classes.oldPrice}` : {}} `}>{price} Р.</h3>
                                { sale
                                    ? <span className={`${classes.sale}`}> {Math.floor(price * (100-sale) / 100) }Р. </span>
                                    : null

                                }

                                {/*<button*/}
                                {/*    id="buttonAddToCart"*/}
                                {/*    onClick={()=>addToCart(item, show)}*/}
                                {/*    className={`${classes.addToCard} btn btn-dark d-flex align-items-center justify-content-between`}*/}
                                {/*>*/}
                                {/*    <span id="buttonAddToCart" style={{fontSize: 23}} className="material-icons">*/}
                                {/*        add_shopping_cart*/}
                                {/*    </span>*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(ItemCard)