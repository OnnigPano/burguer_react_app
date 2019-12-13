import React, { Component } from 'react';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true 
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then( res => {
                this.setState({loading: false});
                let orders = [];
                for (let key in res.data) {
                    orders.push(
                        {...res.data[key],
                        id: key}
                    );
                this.setState({orders: orders});
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({loading: false});
            });
    }

    render() {

        let orders = this.state.orders.map(el => {
            return (
                <Order key={el.id} ingredients={el.ingredients} price={el.totalPrice} />
            );
        });

        if (this.state.loading) {
            orders = <Spinner />;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);