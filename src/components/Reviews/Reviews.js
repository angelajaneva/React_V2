import React, {Component} from 'react';
import {connect} from "react-redux";
import Page from "../Views/Page";
import * as reviewsActionCreator from "../../store/actions/reviews";
import StarRatings from 'react-star-ratings';

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewText: "",
            rating: 0,
        };
    }

    componentDidMount() {
        this.props.getReviews();
    }

    handleChange = event => {
        this.setState({
            reviewText: event.target.value
        });
    };

    changeRating = ( newRating, name ) => {
        this.setState({
            rating: newRating
        });
    };

    saveReview = e => {
        e.preventDefault();

        let review = {
            description: this.state.reviewText,
            rating: this.state.rating
        };

        // todo save
    };

    render() {
        return (
            <Page title={"Reviews"}>
                <div className="reviews-options">
                    <div className={"row row d-flex align-items-center justify-content-end"}>
                        <div className={"col-12 col-md-3 d-flex align-items-center"}>
                            <input type={"test"} placeholder={"Search"} className="form-control"/>
                            <button className={"btn btn-primary"}>
                                <i className={"fa fa-search"} aria-hidden="false"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    this.props.reviews.length ? this.props.reviews.map(item => {
                        return (
                            <div className={"review"} key={item.id}>
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
                <div className={"reviews-form mb-4"}>
                    <h4 className={"font-weight-bold"}>Write Review.</h4>
                    <label className={"font-weight-bold mt-2"}>Rating</label><br/>
                    <StarRatings rating={this.state.rating}
                                 starRatedColor="rgba(255, 193, 7, 1)"
                                 changeRating={this.changeRating}
                                 numberOfStars={5}
                                 name='rating'
                                 starDimension={"30px"}
                    /><br/>
                    <label className={"font-weight-bold mt-4"}>Description</label>
                    <textarea rows={5}
                              className={"form-control"}
                              placeholder={"Enter your review"}
                              value={this.state.reviewText}
                              onChange={this.handleChange}
                    />
                    <button className={"btn btn-primary mt-2"}
                            onClick={this.saveReview}
                    >
                        Save
                    </button>
                </div>
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
