import React, {useContext, useState} from "react"
import {connect} from "react-redux";
import Button from "./UI/Buttun";
import {addToCart} from "../redux/actions/cart";
import classes from "./ItemCard/itemCard.module.css";
import Loader from "./UI/Loader/Loader";
import BreadCrumbs from "./breadcrumbs";
import DropDown from "./DropDown/dropDown";
import {AlertContext} from "../context/alert/alertContext";
import RelatedProducts from "./relatedProducts";

const ItemPage = (props) => {

    let mainItem

    const {show} = useContext(AlertContext)

    Object.keys(props.products).forEach(item => {
        if (props.products[item].articul === props.match.params.id) {
            mainItem = props.products[item]
        }
    })

    const [size, setSize] = useState("")

    const setSizeHanler = (item) => {
        setSize(item.label)
    }

    console.log(mainItem, " this is mainItem")

    const addToCartHandler = (item) => {
        if (item.sizes) {
            if (size) {
                props.addToCart({...item, size: size, id: item.articul+size}, show)
            } else {
                show("Необходимо выбрать размер", "danger")
            }
        } else {
            props.addToCart({...item, id: item.articul}, show)
        }

    }

    return (
        mainItem
            ? <>
            <div className="container p-4">
                <BreadCrumbs product={mainItem}/>
            </div>
            <div className="row d-flex justify-content-center align-items-center flex-grow-0">
                <div className="card mt-2 col-sm-8 mb-3" style={{}}>
                    <div className="row g-1">
                        <div className="col-md-4">
                            <img src={mainItem.imgUrl} className="img-fluid rounded-start" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <div className="mt-3 card-body text-start">
                                <h5 className="card-title">{ mainItem.name }</h5>
                                <div className="prices d-flex align-items-center">
                                    <h5 style={mainItem.sale ? {margin: 0, fontSize: 16, color: "#787878", textDecoration: "line-through"} : null} className="card-title">{ mainItem.price } Р</h5>
                                    {mainItem.sale
                                        ? <span style={{fontSize: 20, color: "#ff3e3e"}} className="sale ms-3"> {mainItem.price * (100- mainItem.sale) / 100} Р </span>
                                        : null
                                    }
                                </div>
                                <h6 className="text-muted"> {mainItem.type} </h6>
                                <p className="card-text"> {
                                    mainItem.description ? mainItem.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac pellentesque tellus, sit amet hendrerit est. Aenean metus leo, mattis at dui eget, varius efficitur magna. Maecenas non tortor vel felis fringilla laoreet eget eget risus. Quisque ut pretium odio, vitae rutrum orci. Nullam congue, mauris sed venenatis accumsan, leo neque condimentum dolor, et interdum lacus leo non felis. Praesent ultricies, tellus eget aliquam ornare, arcu augue rutrum justo, a vehicula sem nunc id diam. Aliquam ac nunc vel risus lobortis cursus. Nam condimentum sodales imperdiet."
                                }
                                </p>
                                {
                                    mainItem.sizes
                                        ? <DropDown
                                            options={{
                                                default: {label: "Размер", name: "none", order: null},
                                                ...mainItem.sizes,
                                            }}
                                            isCorrect={false}
                                            action={setSizeHanler}
                                        >
                                        </DropDown>
                                        : null
                                }
                                <button
                                    onClick={()=>addToCartHandler(mainItem)}
                                    className={`${classes.addToCard} btn btn-success mt-3 d-flex align-items-center justify-content-between`}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedProducts MainItem={mainItem}/>
            </>
            : <Loader></Loader>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.store
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item, show) => dispatch(addToCart(item, show))
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(ItemPage)