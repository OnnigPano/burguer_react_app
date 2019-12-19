import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    meat: 1.3,
    cheese: 0.7,
}

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
            }  
        default:
            return state;
            
    }
}

export default reducer;