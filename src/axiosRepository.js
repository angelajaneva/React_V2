import axios from './custom-axios'
import qs from 'qs'

const service = {

    getNotes: () => {
        return axios.get("/notes")
    },

    getQuestions: () => {
        return axios.get("/questions")
    },

    getNotesForClass: (classId) => {
        return axios.get(`/notes/${classId}`)
    },

    getClasses: () => {
        return axios.get("/classes/S17001")
    },

    getToDo: () => {
        return axios.get("/todos")
    },

    addNote: (note) => {
        const data = {
            ...note
        };
        const formParams = qs.stringify(data);
        return axios.post("/note", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    updateNote: (note) => {
        const data = {
            ...note
        };
        const noteId = note.id;
        const formParams = qs.stringify(data);
        return axios.patch("/" + noteId, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    deleteNote: (noteId) => {
        return axios.delete("/" + noteId);
    },

    deleteQuestion: (questionId) => {
        return axios.delete("/questions/" + questionId);
    },

    updateTodo: (todo) => {
        const data = {
            ...todo
        };
        const todoId = todo.id;
        const formParams = qs.stringify(data);

        return axios.patch("/todo/" + todoId, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
};

export default service;