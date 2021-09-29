import './App.css';
import React, {useEffect, useReducer, useState} from "react";
import Navigation from "./components/navigation";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import {Cart} from "./pages/cart";
import {Home} from "./pages/home";
import Orders from "./pages/orders";
import Auth from "./pages/auth";
import {connect} from "react-redux";
import Alert from "./components/Alert/Alert";
import {AlertState} from "./context/alert/alertState";
import {getOrders, getUserToRedux} from "./redux/actions/auth";
import {getItems} from "./redux/actions/actions";
import api from "./API/products.api";
import itemPage from "./components/itemPage";
import {Admin} from "./pages/admin";
import Routing from "./components/Routing/Routing";


function App(props) {

    const {fetchAll} = api

    const getStoreInfoFromApi = async () => {
        const response = await fetchAll()
        props.getItemsToRedux(response)
    }

    const getAllInfoAfterUpadte = async () => {
        if (localStorage.getItem("userId")) {
            await props.getUserInfo(localStorage.getItem("userId"))
            await props.getUserOrders(localStorage.getItem("userId"))
        }
    }

    useEffect(async () => {
        await getAllInfoAfterUpadte()
        await getStoreInfoFromApi()
    }, [])

    let routing

    if (props.auth.isLogin) {
        routing = (
            <Switch>
                <Route path="/orders" component={Orders}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/cart" component={Cart}/>
                { props.auth.isAdmin ? <Route path="/admin" component={Admin}/> : null }
                <Route path="/cart/:item" component={Cart}/>
                <Route path="/:id" exact component={itemPage}/>
                <Route path="/" exact component={Home}/>
                <Redirect exact to="/" />
            </Switch>
        )
    } else {
        routing = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={Home}/>
                <Redirect to="/" />
            </Switch>
        )
    }

  return (
      <AlertState>
          <BrowserRouter>
            <div className="App">
                <Alert></Alert>
                <Navigation />
                { routing }
            </div>
          </BrowserRouter>
      </AlertState>
  );
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: (userId) => getUserToRedux(dispatch, userId),
        getUserOrders: (userId) => dispatch(getOrders(userId)),
        getItemsToRedux: (items) => dispatch(getItems(items))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
