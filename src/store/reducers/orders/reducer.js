import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_PURCHASED_RESET:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true
            }
        case actionTypes.ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ORDER_LOADING:
            return {
                ...state,
                loading:true
            }   
        default: return state;
    }
}

export default reducer;