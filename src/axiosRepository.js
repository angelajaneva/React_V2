import axios from './custom-axios'
import qs from 'qs'

const service = {

    getNotes: () => {
        return axios.get("/notes")
    },

    getQuestions: () => {
        return axios.get("/questions")
    },

    getClasses: () => {
        return axios.get("/classes/S17001")
    },

    getToDo: () => {
        return axios.get("/todos")
    },

    getReviews: () => {
        return axios.get("/reviews");
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

        {
            console.log(note.noteId)
        }
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


    deleteQuestion: (questionId) => {
        return axios.delete("/questions/" + questionId);
    },

    addComment: (classId, comment) => {
        const data = {
            ...comment
        };
        const formParams = qs.stringify(data);
        return axios.post("/comments/" + classId, formParams, {
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

    deleteTodo: (id) => {
        return axios.delete("/todo/" + id);
    },

    searchTodo: (searchTerm) => {
        return axios.get(`/todo/search?term=${searchTerm}`);
    },

    getReviewsPaged: (page, pageSize) => {
        return axios.get(`/reviews/paged?page=${page}`, {
            headers: {
                'page': page,
                'page-size': pageSize
            }
        })
    },

    addReview: (review) => {
        const data = {
            ...review
        };
        const formParams = qs.stringify(data);
        return axios.post("/review/new", formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },

    searchReviews: (searchTerm) => {
      return axios.get(`/todo/search?term=${searchTerm}`)
    },
};

export default service;