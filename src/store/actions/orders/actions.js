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


export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then( res => {
                let orders = [];
                console.log(res);
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



