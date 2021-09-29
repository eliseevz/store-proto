import React from "react"
import ProductsList from "../components/productsList";
import API from "../API/products.api"
import Banner from "../components/banner";


export const Home = () => {

    const {fetchAll} = API

    const getProductsList = async () => {
        const response = await fetchAll()
        return response
    }

    return (
        <>
        <Banner url={"https://images.unsplash.com/photo-1583438861468-3b7963d64749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"} text={"Скидка  10% по промокоду 'CODE10'"}/>
        <ProductsList />
        </>
    )
}