import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {

        let orders = this.props.orders.map(el => {
            return (
                <Order key={el.id} ingredients={el.ingredients} price={el.totalPrice} />
            );
        });

        if (this.props.loading) {
            orders = <Spinner />;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));