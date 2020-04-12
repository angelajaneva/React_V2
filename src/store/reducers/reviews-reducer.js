import * as actionTYPE from '../actions'

const initialState = {
    reviews: []
};
const reducer = (state = initialState, action) => {
    if (action.type === actionTYPE.SET_REVIEWS) {
        return {
            ...state,
            reviews: action.reviews
        }
    }
    return state;
};

export default reducer;