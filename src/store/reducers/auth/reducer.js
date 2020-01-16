import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    idToken: null,
    refreshToken: null,
    expiresIn: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_INIT:
            return {
                ...initialState,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...initialState,
                idToken: action.data.idToken,
                refreshToken: action.data.refreshToken,
                expiresIn: action.data.expiresIn,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...initialState,
                loading: false,
                error: action.error
            }
    
        default: return state;
    }
}

export default reducer;