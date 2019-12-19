import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from './../../store/actions';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        spinner: false,
        error: false
    }

    isPurchasableHandler = () => {
        const sum = Object.values(this.props.ings)
            .reduce((acum, elem) => {
                return acum + elem;
            }, 0);
        
            return sum > 0
        
    }

    // addIngredientsHandler = (type) => {
    //     const cantidad = this.state.ingredients[type];
    //     const cantidadActualizada = cantidad + 1;
    //     const nuevoStateIngredients = {
    //         ...this.state.ingredients
    //     }
    //     nuevoStateIngredients[type] = cantidadActualizada;

    //     const precioIngredient = INGREDIENT_PRICES[type];
    //     const precioTotalAnterior = this.state.totalPrice;
    //     const nuevoPrecioTotal = precioTotalAnterior + precioIngredient;

    //     this.setState({ 
    //         ingredients: nuevoStateIngredients,
    //         totalPrice: nuevoPrecioTotal
    //      });
    //     this.isPurchasableHandler(nuevoStateIngredients);
    // }

    // removeIngredientsHandler = (type) => {
    //     const cantidad = this.state.ingredients[type];
    //     const cantidadActualizada = cantidad - 1;
    //     if (cantidad <= 0) {
    //         return;
    //     }
    //     const nuevoStateIngredients = {
    //         ...this.state.ingredients
    //     }
    //     nuevoStateIngredients[type] = cantidadActualizada;

    //     const precioIngredient = INGREDIENT_PRICES[type];
    //     const precioTotalAnterior = this.state.totalPrice;
    //     const nuevoPrecioTotal = precioTotalAnterior - precioIngredient;

    //     this.setState({ 
    //         ingredients: nuevoStateIngredients,
    //         totalPrice: nuevoPrecioTotal
    //      });
    //      this.isPurchasableHandler(nuevoStateIngredients);
    // }

    purchasingHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // queryParams.push('price=' + this.state.totalPrice);
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));       
        // }
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');
    }

    // componentDidMount() {
    //     axios.get('/ingredients.json')
    //     .then( response => {
    //         this.setState({ingredients: response.data});
    //     } )
    //     .catch( error => {
    //         this.setState({error: error});
    //     })
    // }

    render(){

        const disableInfo = {
            ...this.props.ings
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;
        }

        let burger = this.state.error ? <p>Error papu, no carga ingredientes desde axios.get</p> : <Spinner />;
        let orderSummary = null;

        if(this.props.ings) {
            orderSummary = this.state.spinner ? <Spinner /> : <OrderSummary 
                ingredients={this.props.ings} 
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.props.totalPrice}
            />;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    add={this.props.addIngredient}
                    remove={this.props.removeIngredient}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    purchasable={this.isPurchasableHandler()}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingName}),
        removeIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));