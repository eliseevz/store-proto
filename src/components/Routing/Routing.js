import React from "react"
import {Redirect, Route, Switch} from "react-router-dom";
import Orders from "../../pages/orders";
import Auth from "../../pages/auth";
import {Cart} from "../../pages/cart";
import itemPage from "../itemPage";
import {Home} from "../../pages/home";

const Routing = (props) => {
    let routing

        if (props.auth.isLogin) {
            routing = (
                <Switch>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/cart" component={Cart}/>
                    { props.auth.isAdmin ? <Route path="/admin" component={Cart}/> : null }
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
        {routing}
    )
}

export default Routing