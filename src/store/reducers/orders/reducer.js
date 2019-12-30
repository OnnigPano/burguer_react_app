import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    orders: [],
    loading: true 
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        default: return state;
    }
}

export default reducer;