import './App.css';
import React, {useEffect, useReducer} from "react";
import Navigation from "./components/navigation";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import {Cart} from "./pages/cart";
import {Home} from "./pages/home";
import Orders from "./pages/orders";
import Auth from "./pages/auth";
import {connect} from "react-redux";
import Alert from "./components/Alert/Alert";
import {AlertState} from "./context/alert/alertState";
import {getUserToRedux} from "./redux/actions/auth";
import authReducer from "./redux/reducers/auth";


function App(props) {

    useEffect(() => {
        props.getUserInfo(localStorage.getItem("userId"))
        console.log("hello its app")
    }, [])

    let routing

    if (props.auth.isLogin) {
         routing = (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/cart/:item" component={Cart}/>
                <Redirect to="/" />
            </Switch>
        )
    } else {
        routing = (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" component={Auth}/>
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
        getUserInfo: (userId) => getUserToRedux(dispatch, userId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
