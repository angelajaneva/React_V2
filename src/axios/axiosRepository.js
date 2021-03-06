import axios from './custom-axios'
import qs from 'qs'

const service = {

    getNotes: () => {
        return axios.get("/notes")
    },

    getQuestions: () => {
        return axios.get("/questions")
    },

    getClasses: (username) => {
        return axios.get("/class/student/" + username)
    },

    getToDo: (username) => {
        return axios.get("/todos/" + username)
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

        const formParams = qs.stringify(data);
        return axios.patch("/note/edit", formParams, {
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
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
        console.log(searchTerm)
        return axios.get(`/reviews/search?criteria=${searchTerm}`)
    },

    getUser: (username) => {
        return axios.get("/users/" + username)
    }
};

export default service;