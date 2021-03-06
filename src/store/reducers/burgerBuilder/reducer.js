import * as actionTypes from '../../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    meat: 1.3,
    cheese: 0.7,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: true
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
        case actionTypes.SET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                loading: false,
                error: false,
                totalPrice: 4
            }  
        case actionTypes.SET_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
                loading: false 
            }                      
        default:
            return state;
            
    }
}

export default reducer;