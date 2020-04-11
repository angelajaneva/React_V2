import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const setToDo = (todos) => {
    return {
        type: actionTYPES.SET_TODOs,
        toDos: todos
    }
};

export const createToDo = (todo) => {
    return {
        type: actionTYPES.CREATE_TODO,
        toDo: todo
    }
};

export const deleteToDo = (id) => {
    return {
        type: actionTYPES.DELETE_TODO,
        toDoId: id
    }
};

export const updateToDo = (todo) => {
    return {
        type: actionTYPES.EDIT_TODO,
        toDo: todo
    }
};

//async
export const loadToDos = () => {

    return (dispatch) => {
        //here I can execute async code and then dispatch a new action
        service.getToDo().then(response => {
            dispatch(setToDo(response.data));
        })
    }
};

export const updateToDos = (edited) => {
    return dispatch => {
        service.updateTodo(edited).then((response) => {
            dispatch(updateToDo(response.data))
        })
    }
}