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

        {console.log(note.noteId)}
        const formParams = qs.stringify(data);
        return axios.patch("/note/edit", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
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
        const todoId = todo.todoId;
        const formParams = qs.stringify(data);

        return axios.patch("/todo/" + todoId, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    createTodo: (todo) => {
        const data = {
            ...todo
        };
        const formParams = qs.stringify(data);
        return axios.post("/todo", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    deleteTodo: (id) => {
        return axios.delete("/todo/" + id);
    },

    searchTodo: (searchTerm) => {
        return axios.get(`/todo/search?term=${searchTerm}`);
    },
    getReviews: () => {
        return axios.get("http://all.local/_Projects/Freelancing/angrus/api/reviews.php");
    },
};

export default service;