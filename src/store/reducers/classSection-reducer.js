import * as actionTYPE from '../actions'

const initialState = {
    notes: [],
    classes: [],
    questions: [],
    user: []
};

const reducer = (state = initialState, action) => {


    //CLASSES
    if (action.type === actionTYPE.SET_CLASSES) {
        return {
            ...state,
            classes: action.classes
        };

    }

    //NOTES
    if (action.type === actionTYPE.SET_NOTES) {
        return {
            ...state,
            notes: action.notes
        };
    }

    if (action.type === actionTYPE.ADD_NOTE) {
        return {
            ...state,
            notes: state.notes.concat(action.newNote)
        };
    }

    if (action.type === actionTYPE.DELETE_NOTE) {
        const newRef = state.notes.filter((note) => note.id !== action.noteId);
        return {
            ...state,
            notes: newRef
        };
    }

    if (action.type === actionTYPE.UPDATE_NOTE) {
        const editRef = state.notes.map((note) => {
            if (note.id === action.editedNote.id)
                return action.editedNote;
            return note
        });
        return {
            ...state,
            notes: editRef
        };
    }

    //QUESTIONS
    if (action.type === actionTYPE.SET_QUESTIONS) {
        return {
            ...state,
            questions: action.questions
        };
    }

    if (action.type === actionTYPE.ADD_QUESTION) {
        return {
            ...state,
            questions: state.questions.concat(action.newQuestion)
        };
    }

    if (action.type === actionTYPE.DELETE_QUESTION) {
        const newRef = state.questions.filter((question) => question.id !== action.questionId);
        return {
            ...state,
            questions: newRef
        };
    }

    if (action.type === actionTYPE.CURRENT_USER) {
        return {
            ...state,
            user: action.user
        };

    }

    return state;
};

export default reducer;

