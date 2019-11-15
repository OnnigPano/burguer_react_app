import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    meat: 1.3,
    cheese: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        purchasable: false
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

    render(){

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;
        }

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                add={this.addIngredientsHandler}
                remove={this.removeIngredientsHandler}
                disabled={disableInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;