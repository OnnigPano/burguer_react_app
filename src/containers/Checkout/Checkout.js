import React, { Component } from "react";

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


class Checkout extends Component {

    state = {
        ingredients:null,
        spinner: true
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    continueOrderHandler = () => {
           
         const order = {
             ingredients: this.state.ingredients,
             totalPrice: this.state.totalPrice,
             costumer: {
                 name: 'Onnig Panossian',
                 adress: 'Av. Kimbalache 111',
                 email: 'onnigpano@gmail.com',
                 zipCode: '1437'
             },
             deliveryMethod: 'fastest'
         }

         this.setState({spinner: true});


          axios.post('/orders.json', order)
          .then( response => {
              console.log(response);
              this.setState({spinner: false});
          })
          .catch( error => {
              console.log(error);
              this.setState({spinner: false});
          });
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
                />
            </div>    
        );
    }
}

export default Checkout;