import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const setReviews = (reviews, page, pageSize, totalPages) => {
    return {
        type: actionTYPES.SET_REVIEWS_PAGED,
        reviews: reviews,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages

    }
};

export const addReview = (review) => {
    return {
        type: actionTYPES.ADD_REVIEWS,
        newReview: review
    }
};

//async
export const loadReviews = (page) => {
    return (dispatch) => {
        service.getReviewsPaged(page, 3).then(response => {
            dispatch(setReviews(response.data.content, page,
                response.data.pageable.pageSize,
                response.data.totalPages))
        })
    }
};

export const createReview = (review) => {
    return (dispatch) => {
        service.addReview(review).then(response => {
            dispatch(addReview(response.data))
        })
    }
};