import * as actionTYPES from "../actions.js"
import service from "../../axios/axiosRepository";

export const addComment = (comment) => {
    return {
        type: actionTYPES.ADD_COMMENT,
        newComment: comment
    }
};
