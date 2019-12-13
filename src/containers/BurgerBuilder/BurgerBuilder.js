import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    meat: 1.3,
    cheese: 0.7,
    error: false
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        spinner: false
    }

    isPurchasableHandler = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((acum, elem) => {
                return acum + elem;
            }, 0);
        
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientsHandler = (type) => {
        const cantidad = this.state.ingredients[type];
        const cantidadActualizada = cantidad + 1;
        const nuevoStateIngredients = {
            ...this.state.ingredients
        }
        nuevoStateIngredients[type] = cantidadActualizada;

        const precioIngredient = INGREDIENT_PRICES[type];
        const precioTotalAnterior = this.state.totalPrice;
        const nuevoPrecioTotal = precioTotalAnterior + precioIngredient;

        this.setState({ 
            ingredients: nuevoStateIngredients,
            totalPrice: nuevoPrecioTotal
         });
        this.isPurchasableHandler(nuevoStateIngredients);
    }

    removeIngredientsHandler = (type) => {
        const cantidad = this.state.ingredients[type];
        const cantidadActualizada = cantidad - 1;
        if (cantidad <= 0) {
            return;
        }
        const nuevoStateIngredients = {
            ...this.state.ingredients
        }
        nuevoStateIngredients[type] = cantidadActualizada;

        const precioIngredient = INGREDIENT_PRICES[type];
        const precioTotalAnterior = this.state.totalPrice;
        const nuevoPrecioTotal = precioTotalAnterior - precioIngredient;

        this.setState({ 
            ingredients: nuevoStateIngredients,
            totalPrice: nuevoPrecioTotal
         });
         this.isPurchasableHandler(nuevoStateIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        queryParams.push('price=' + this.state.totalPrice);
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));       
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    componentDidMount() {
        axios.get('/ingredients.json')
        .then( response => {
            this.setState({ingredients: response.data});
        } )
        .catch( error => {
            this.setState({error: error});
        })
    }

    render(){

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;
        }

        let burger = this.state.error ? <p>Error papu, no carga ingredientes desde axios.get</p> : <Spinner />;
        let orderSummary = null;

        if(this.state.ingredients) {
            orderSummary = this.state.spinner ? <Spinner /> : <OrderSummary 
                ingredients={this.state.ingredients} 
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice}
            />;
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    add={this.addIngredientsHandler}
                    remove={this.removeIngredientsHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchasingHandler}
                    />
                </Aux>
            );
        }    
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);