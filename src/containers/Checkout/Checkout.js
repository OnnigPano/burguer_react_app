import React, { Component } from "react";

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings} 
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
                />
                <Route 
                path={ this.props.match.path + '/contact-data' } 
                component={ContactData}/>
            </div>    
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);