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

export const setTotal = (total) => {
    {console.log(total + "total")}
    return pages = total;
};

//async
export const loadReviews = (page) => {
    return (dispatch) => {
        service.getReviewsPaged(page, 3).then(response => {
            totalPages();
            console.log(pages);
            dispatch(setReviews(response.data, page,
                3,
                5));
        })
    }
};

export let pages;

export const totalPages = () => {
     service.getReviews().then(response => {
         return setTotal(response.data.length)
    })
};


export const createReview = (review) => {
    return (dispatch) => {
        service.addReview(review).then(response => {
            dispatch(addReview(response.data))
        })
    }
};