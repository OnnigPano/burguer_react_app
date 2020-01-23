import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    idToken: null,
    refreshToken: null,
    localId: null,
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
                idToken: action.idToken,
                refreshToken: action.refreshToken,
                localId: action.localId,
                loading: false
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...initialState,
                loading: false,
                error: action.error
            }
        case actionTypes.LOGOUT:
            return {
                ...initialState,
                idToken: null,
                refreshToken: null,
                localId: null
            }
        default: return state;
    }
}

export default reducer;