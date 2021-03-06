import * as actionTYPE from '../actions'

const initialState = {
    reviews: [],
    searched: [],
    pageSize: 3,
    page: 0,
    totalPages: 0
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTYPE.SET_REVIEWS_PAGED) {
        return {
            reviews: action.reviews,
            page: action.page,
            pageSize: action.pageSize,
            totalPages: action.totalPages
        }
    }
    if (action.type === actionTYPE.ADD_REVIEWS) {
        return {
            ...state,
            reviews: state.reviews.concat(action.newReview)
        }
    }

    if (action.type === actionTYPE.SEARCH_REVIEWS) {
        return {
            ...state,
            searched: action.searchResults
        }
    }

    return state;
};

export default reducer;