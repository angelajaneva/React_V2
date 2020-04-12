import React, {Component} from 'react';
import {connect} from "react-redux";
import Page from "../Views/Page";
import * as reviewsActionCreator from "../../store/actions/reviews";

class Reviews extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getReviews();
    }

    render() {
        return (
            <Page title={"Reviews"}>
            {
                this.props.reviews.length ? this.props.reviews.map(item => {
                    return (
                        <div className={"review"}>
                            <div className="review-holder">
                                <div className="review-holder-header">
                                    <div className="review-holder-header-left">
                                        <img src={require('../user.png')} />
                                        <h5>{item.student.firstName} {item.student.lastName}</h5>
                                    </div>
                                    <div className="review-holder-header-right">
                                        <button className="btn btn-link text-warning">
                                            <i className={"fa fa-star mr-1"} aria-hidden="false"></i>
                                            <span className={"rate"}>{item.rated}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="review-holder-body">
                                    {item.text}
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <h3 className={"not-found"}>No reviews found</h3>
                )
            }
            </Page>
        );
    }
}

//which property should hold which slide of the state
const mapStateToProps = (state) => {
    return {
        reviews: state.reviewsReducer.reviews
    }
};
//receives the dispatch function as arg
const mapDispatchToProps = (dispatch) => {
    return {
        getReviews: () => dispatch(reviewsActionCreator.loadReviews()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
