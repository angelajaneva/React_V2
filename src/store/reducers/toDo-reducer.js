import * as actionTYPE from '../actions'

const initialState = {
    toDos: [],
    searched_toDos: []
};
const reducer = (state = initialState, action) => {

    if (action.type === actionTYPE.SET_TODOs) {
        return {
            ...state,
            toDos: action.toDos,
        }
    }
    if (action.type === actionTYPE.EDIT_TODO) {
        const newRef = state.toDos.map((todo) => {
            if (todo.id === action.toDo.id)
                return action.toDo;
            return todo;
        });
        return {
            ...state,
            toDos: newRef
        }
    }

    if (action.type === actionTYPE.CREATE_TODO) {
        return {
            ...state,
            toDos: state.toDos.concat(action.toDo)
        };
    }

    if (action.type === actionTYPE.DELETE_TODO) {
        const newRef = state.toDos.filter((todo) => todo.id !== action.todoId);
        return {
            ...state,
            toDos: newRef
        };
    }

    if (action.type === actionTYPE.SEARCH_TODOs) {
        return {
            ...state,
            searched_toDos: action.data
        }
    }

    return state;
};

export default reducer;