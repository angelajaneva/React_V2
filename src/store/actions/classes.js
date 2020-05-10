import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const setClass = (classes) => {
    return {
        type: actionTYPES.SET_CLASSES,
        classes: classes
    }
};

//async
export const loadClassesForStudent = (username) => {
    return (dispatch) => {
        //here I can execute async code and then dispatch a new action
        service.getClasses(username).then(response => {
            dispatch(setClass(response.data));
        })
    }
};
