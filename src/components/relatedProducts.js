import React, {useEffect, useState} from "react"
import {connect} from "react-redux";
import ItemCard from "./ItemCard/itemCard";
import Loader from "./UI/Loader/Loader";

const RelatedProducts = (props) => {

    const {MainItem} = props

    const [mainItem, setMainItem] = useState(MainItem)

    const generateRandomItems = (items) => {
        console.log("RANDOMAZER")
        let randoms = []
        for(let i = 0; i < 4; i++) {
            const rand = Math.floor(Math.random() * (items.length))
            if (!randoms.includes(rand) && props.products.store[rand].articul !== mainItem.articul) {
                randoms.push(rand)
            } else {
                i--
            }
        }
        return randoms
    }

    const [randoms, setRandoms] = useState()

    useEffect( () => {
        setRandoms(generateRandomItems(props.products.store))
    }, [mainItem])

    // useEffect(()=> {
    //     console.log("useEffect")
    //     const randomItems = generateRandomItems(props.products.store)
    //     setRandoms(randomItems)
    // }, [])

    // const randomItems = generateRandomItems(props.products.store)

    return (
        <div className="container">
            <h3>Смотрите так же</h3>
            <div className="row d-flex justify-content-center mt-5">
                {
                    randoms
                    ? ( <>
                            {randoms.map(item => {
                                return <ItemCard onClick={setMainItem} item={props.products.store[item]}/>
                            })
                            }
                        </>
                    )
                    : <Loader/>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(RelatedProducts)