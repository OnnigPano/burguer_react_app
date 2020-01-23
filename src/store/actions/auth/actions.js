import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

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
                dispatch(authSuccess(response.data.idToken, response.data.refreshToken, response.data.localId));
                dispatch(checkToken(response.data.expiresIn));

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('idToken', response.data.idToken );
                localStorage.setItem('expirationDate', expirationDate );
                localStorage.setItem('userId', response.data.localId);
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

export const authSuccess = (idToken, refreshToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        refreshToken: refreshToken,
        localId: localId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const checkToken = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');

        if (!token) {
            dispatch(logout());
        } else {
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, null, userId));
                dispatch(checkToken((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
}