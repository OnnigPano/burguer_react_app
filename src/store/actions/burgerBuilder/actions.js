import * as actionTypes from '../actionTypes';
import axios from '../../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientType: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: name
    }
}

const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
    }
}

const setIngredientsSucces = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS_SUCCES,
        ingredients: ingredients
    }
}

export const setIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response);
                dispatch(setIngredientsSucces(response.data));
            })
            .catch(error => {
                dispatch(setIngredientsFailed());
            })
    }
}

