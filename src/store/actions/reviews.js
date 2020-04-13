import * as actionTYPES from "../actions.js"
import service from "../../axiosRepository";

export const setReviews = (reviews, page, pageSize, totalPages) => {
    return {
        type: actionTYPES.SET_REVIEWS,
        reviews: reviews,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages

    }
};

//async
export const loadReviews = (page) => {
    return (dispatch) => {
        service.getReviewsPaged(page, 3).then(response => {
            dispatch(setReviews(response.data.content, page,
                response.data.pageable.pageSize,
                response.data.totalPages));
        })
    }
};