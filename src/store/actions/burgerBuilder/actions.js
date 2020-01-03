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

const setIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS_SUCCESS,
        ingredients: ingredients
    }
}

export const setIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredientsSuccess(response.data));
            })
            .catch(error => {
                dispatch(setIngredientsFailed());
            })
    }
}

