import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const setReviews = (reviews) => {
    return {
        type: actionTYPES.SET_REVIEWS,
        reviews: reviews
    }
};

//async
export const loadReviews = () => {
    return (dispatch) => {
        service.getReviews().then(response => {
            dispatch(setReviews(response.data));
        })
    }
};