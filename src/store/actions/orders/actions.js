import * as actionTypes from '../actionTypes';
import axios from '../../../axios-orders';


const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED
    }
}

const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}


export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('/orders.json')
            .then( res => {
                let orders = [];
                for (let key in res.data) {
                    orders.push(
                        {...res.data[key],
                        id: key}
                    ); 
                }    
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed());
            });
    }
}  

export const orderInit = (order) => {
    return dispatch => {
        dispatch(orderLoadStart());
        axios.post('/orders.json', order)
           .then( response => {
               dispatch(orderSuccess());
           })
           .catch( error => {
               dispatch(orderFailed());
           });
    }
}

const orderFailed = () => {
    return {
        type: actionTypes.ORDER_FAILED
    }
}

const orderSuccess = () => {
    return {
        type: actionTypes.ORDER_SUCCESS
    }
}

const orderLoadStart = () => {
    return {
        type: actionTypes.ORDER_LOADING
    }
}

export const orderPurchasedReset = () => {
    return {
        type: actionTypes.ORDER_PURCHASED_RESET
    }
}



