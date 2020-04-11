//action creator for notes
import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const addNote = (note) => {
    return {
        type: actionTYPES.ADD_NOTE,
        newNote: note
    }
};
export const deleteNote = (noteId) => {
    return {
        type: actionTYPES.DELETE_NOTE,
        noteId: noteId
    }
};

export const updateNote = (note) => {
    return {
        type: actionTYPES.UPDATE_NOTE,
        editedNote: note
    }
};

export const setNotes = (notes) => {
    return {
        type: actionTYPES.SET_NOTES,
        notes: notes
    }
};

//async
export const loadNotes = () => {

    return (dispatch) => {
        //here I can execute async code and then dispatch a new action
        service.getNotes().then(response => {
            // this.setState({"notes": response.data
            dispatch(setNotes(response.data));
        })
    }
};
//async code for deleting
export const deleteNotes = (id) => {

    return (dispatch) => {
        service.deleteNote(id).then(() => {
            dispatch(deleteNote(id));
        })
    }
};


export const updateNotes = (note) => {

    return (dispatch) => {
        service.updateNote(note).then((response) => {
            const editedNote = response.data;
            dispatch(updateNote(editedNote));
        })
    }
};

export const addNotes = (note) => {

    return (dispatch) => {
        service.addNote(note).then((response) => {
            dispatch(addNote(response.data))
        })
    }
};