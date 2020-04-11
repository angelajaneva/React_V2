import * as actionTYPE from '../actions'

const initialState = {
    toDos: []
};
const reducer = (state = initialState, action) => {

    if (action.type === actionTYPE.SET_TODOs) {
        return {
            ...state,
            toDos: action.toDos
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
    return state;
};

export default reducer;