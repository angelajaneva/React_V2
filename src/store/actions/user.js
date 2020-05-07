import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const setUser = (user) => {
    return {
        type: actionTYPES.CURRENT_USER,
        user: user
    }
};


export const getUser = (username) => {
    return dispatch => {
        service.getUser(username).then(response => {
            dispatch(setUser(response.data));
        })
    }
};