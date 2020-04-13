import React, {Component} from 'react';
import {connect} from "react-redux";
import Page from "../Views/Page";
import * as reviewsActionCreator from "../../store/actions/reviews";
import StarRatings from 'react-star-ratings';
import ReactPaginate from 'react-paginate';


class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewClass: "",
            reviewText: "",
            rating: 0,
        };
    }

    componentDidMount() {
        this.props.getReviews();
    }

    handleChange = event => {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        });
    };

    changeRating = (newRating, name) => {
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


    handlePageClick = (e) => {
        this.props.getReviews(e.selected)
    };

    paginate = () => {
        if (this.props.page !== null) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={this.props.totalPages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={this.props.totalPages}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    };

    render() {
        return (
            <Page title={"Reviews"}>
                <div className="reviews-options">
                    <div className={"row row d-flex align-items-center justify-content-end"}>
                        <div className={"col-12 col-md-3 d-flex align-items-center"}>
                            <input type={"test"} placeholder={"Search"} className="form-control"/>
                            <button className={"btn btn-primary"}>
                                <i className={"fa fa-search"} aria-hidden="false"/>
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
                                            <img src={require('../user.png')}/>
                                            <h6>{item.student.firstName} {item.student.lastName} about
                                                <span className="font-weight-bolder"> {item.aclass.name}</span>
                                            </h6>
                                        </div>
                                        <div className="review-holder-header-right">
                                            <button className="btn btn-link text-warning">
                                                <i className={"fa fa-star mr-1"} aria-hidden="false"/>
                                                <span className={"rate"}>{item.rated}/5</span>
                                                <br/><span><small>{item.createdOn}</small></span>
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
                {this.paginate()}
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
                    <label className={"font-weight-bold mt-4"}>Name of the class</label>
                    <textarea rows={1}
                              className={"form-control"}
                              placeholder={"Enter class name"}
                              value={this.state.reviewClass}
                              onChange={this.handleChange}
                    />

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
        reviews: state.reviewsReducer.reviews,
        pageSize: state.reviewsReducer.pageSize,
        page: state.reviewsReducer.page,
        totalPages: state.reviewsReducer.totalPages
    }
};
//receives the dispatch function as arg
const mapDispatchToProps = (dispatch) => {
    return {
        getReviews: (page = 0) => dispatch(reviewsActionCreator.loadReviews(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
