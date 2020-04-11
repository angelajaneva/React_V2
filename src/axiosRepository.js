import axios from './custom-axios'
import qs from 'qs'

const service = {

    getNotes: () => {
        return axios.get("http://all.local/_Projects/Freelancing/angrus/api/notes.php")
    },

    getQuestions: () => {
        return axios.get("http://all.local/_Projects/Freelancing/angrus/api/notes.php")
    },

    getNotesForClass: (classId) => {
        return axios.get(`/notes/${classId}`)
    },

    getClasses: () => {
        return axios.get("http://localhost/_Projects/Freelancing/angrus/api/classes.php")
    },

    getToDo: () => {
        return axios.get("/todos")
    },

    addNote: (note) => {
        const data = {
            ...note
        };
        // {console.log("vo axios repo " + note.aclass.id)}
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

    addQuestion: (question) => {
        const data = {
            ...question
        };
        const formParams = qs.stringify(data);
        return axios.post("/question", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
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