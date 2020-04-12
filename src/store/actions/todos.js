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
        todoId: id
    }
};

export const updateToDo = (todo) => {
    return {
        type: actionTYPES.EDIT_TODO,
        toDo: todo
    }
};

export const searchToDo = (data) => {
    return {
        type: actionTYPES.SEARCH_TODOs,
        data: data
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
};

export const createToDos = (todo) => {
    return dispatch => {
        service.createTodo(todo).then((response) => {
            dispatch(createToDo(response.data));
        })
    }
};


export const deleteToDos = (id) => {
    return dispatch => {
        service.deleteTodo(id).then(() => {
            dispatch(deleteToDo(id));
        })
    }
};

export const searchToDos = (term) => {
    return dispatch => {
        service.searchTodo(term).then((response) => {
            dispatch(setToDo(response.data));
            loadToDos()
        })
    }
};
