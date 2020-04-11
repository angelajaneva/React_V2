import * as actionTYPES from "../actions.js"

export const authStart = () => {
    return {
        type: actionTYPES.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTYPES.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTYPES.AUTH_FAIL,
        error: error
    }
};

//async code doing the authentication
export const auth = (username, password) => {
    return dispatch => {
        //...tuka treba nekoj povik do serverot
        dispatch(authStart())
    }
};