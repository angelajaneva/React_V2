import * as actionTYPE from '../actions'

const initialState = {
    reviews: [],
    pageSize: 3,
    page: 0,
    totalPages: 0
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTYPE.SET_REVIEWS) {
        return {
            reviews: action.reviews,
            page: action.page,
            pageSize: action.pageSize,
            totalPages: action.totalPages
        }
    }
    return state;
};

export default reducer;