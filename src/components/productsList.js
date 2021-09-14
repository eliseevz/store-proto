import React from "react"
import {connect} from "react-redux";
import {add, reset, sub} from "../redux/actions/actions";

const ProductsList = (props) => (
    <div className="container">
        <div className="row">
            { props.store.map( (item, index) => (
                <div key={index} className="col-sm-3 card text-dark bg-light m-4">
                    <div className="card-header">{item.name}</div>
                    <div className="card-body">
                        <button onClick={() => props.onAdd(item.name)} className="badge bg-dark">+</button>
                        <span className="badge bg-light" style={{fontSize: 18, color: "#000"}}>{item.count}</span>
                        <button onClick={() => props.onSub(item.name)} className="badge bg-dark">-</button>
                    </div>
                    <span onClick={()=> props.onReset(item.name) } style={{}} className="btn rounded-pill bg-danger mb-3 fs-7 text-light">Сбросить</span>
                </div>
            )) }
        </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        store: state.products.store
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onAdd: (name) => dispatch(add(name, state)),
        onSub: (name) => dispatch(sub(name, state)),
        onReset: (name) => dispatch(reset(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)