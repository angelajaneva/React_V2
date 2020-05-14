//action creator for questions
import * as actionTYPES from "../actions.js"
import service from "../../axios/axiosRepository";

export const addQuestion = (question) => {
    return {
        type: actionTYPES.ADD_QUESTION,
        newQuestion: question
    }
};
export const deleteQuestion = (questionId) => {
    return {
        type: actionTYPES.DELETE_QUESTION,
        questionId: questionId
    }
};


export const setQuestions = (questions) => {
    return {
        type: actionTYPES.SET_QUESTIONS,
        questions: questions
    }
};

//async
export const loadQuestions = () => {

    return (dispatch) => {
        //here I can execute async code and then dispatch a new action
        service.getQuestions().then(response => {
            dispatch(setQuestions(response.data));
        })
    }
};

//async code for deleting
export const deleteQuestions = (id) => {

    return (dispatch) => {
        service.deleteQuestion(id).then(() => {
            dispatch(deleteQuestion(id));
        })
    }
};

export const addQuestions = (question) => {

    return (dispatch) => {
        service.addQuestion(question).then((response) => {
            dispatch(addQuestion(response.data))
        })
    }
};
