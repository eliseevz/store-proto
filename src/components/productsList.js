import React, {useContext, useEffect, useState} from "react"
import {connect} from "react-redux";
import {add, reset, sub} from "../redux/actions/actions";
import api from "../API/products.api"
import Loader from "./UI/Loader/Loader";
import ItemCard from "./ItemCard/itemCard";
import {addToCart} from "../redux/actions/cart";
import FilterBar from "./FilterBar/filterBar";
import _ from "lodash"
import {AlertContext} from "../context/alert/alertContext";

const ProductsList = (props) => {

    const getStoreInfoFromApi = async () => {
        const response = await fetchAll()
    }

    const {fetchAll} = api

    const [selectedCategory, setCategory] = useState("Все")

    const selectCategoryHandler = (name) => {
        setCategory(name)
        console.log(name)
    }

    const [filter, setFilter] = useState("default")

    const selectFilterHandler = (name) => {
        setFilter(name)
    }

    const cropStore = filter !== "default"
        ? _.orderBy(props.store, [filter.name], [filter.order])
        : props.store

    return (
        <div className="container flex-column d-flex justify-content-start mt-3 p-5">
            <FilterBar selectFilterHandler={selectFilterHandler} selectCategoryHandler={selectCategoryHandler} />
            <div className="row d-flex justify-content-center">
                { cropStore.length !== 0
                ? cropStore.map( (item, index) => {
                    return <ItemCard addToCart={props.addToCart} selectedCategory={selectedCategory} key={index} item={item}/>
                 })
                : <Loader/>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        store: state.products.store,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onAdd: (name) => dispatch(add(name, state)),
        onSub: (name) => dispatch(sub(name, state)),
        onReset: (name) => dispatch(reset(name)),
        addToCart: (item, show) => dispatch(addToCart(item,show))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)