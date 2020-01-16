import * as actionTypes from '../actionTypes';
import axios from 'axios';



export const authInit = (email, password, signUp) => {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return dispatch => {
        dispatch(authStart());
        let endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCe_wq_KBdWM_dwytyV4hec9M24ou91xe0';

        if (!signUp) {
            endPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe_wq_KBdWM_dwytyV4hec9M24ou91xe0';
        }
        axios.post(endPoint, data)
            .then(response => {
                dispatch(authSuccess(response.data));
                console.log(response);
            })
            .catch(error => {
                return dispatch(authFailed(error.message));
            })
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: data
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}