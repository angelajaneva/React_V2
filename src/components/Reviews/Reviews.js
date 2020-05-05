import React, {Component} from 'react';
import {connect} from "react-redux";
import Page from "../Views/Page";
import * as reviewsActionCreator from "../../store/actions/reviews";
import StarRatings from 'react-star-ratings';
import ReactPaginate from 'react-paginate';
import {Events, animateScroll as scroll} from 'react-scroll'
import ValidForm from 'react-valid-form-component'
import * as queryString from 'query-string'

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

        Events.scrollEvent.register('begin', function(to, element) {
        });

        Events.scrollEvent.register('end', function(to, element) {
        });

        console.log(window.location.search + " aaa");
        const values = queryString.parse(window.location.search);
        console.log(values.term)
        // fetchData(values.term)
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

     getParams = (location) =>{
        const searchParams = new URLSearchParams(location.search);
        return {
            query: searchParams.get('term') || '',
        };
    };


    handleChangeText = event => {
        this.setState({
            reviewText: event.target.value
        });
    };

    handleChangeClass = event => {
        this.setState({
            reviewClass: event.target.value
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
            text: this.state.reviewText,
            rated: this.state.rating,
            className: this.state.reviewClass
        };


        this.props.onCreateReview(review);
        this.setState({
            reviewClass: "",
            reviewText: "",
            rating: 0,
        })
    };

    isEnabled = () => {
        return this.state.rating > 0 && this.state.reviewClass.length > 0 &&
            this.state.reviewText.length > 0;
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
                               activeClassName="active"/>
            )
        }
    };

    render() {
        return (
            <div className="wrapper align-items-stretch" id="content-area">
                <Page title={"Reviews"}>
                    <div className="reviews-options">
                        <div className={"row row d-flex align-items-center justify-content-end"}>
                            <div className={"col-12 col-md-3 d-flex align-items-center"}>
                                <button className={"btn card ti-write my-2 my-sm-0"}
                                        title={"Write a review"} onClick={() => scroll.scrollToBottom()}/>
                                <input type={"test"} placeholder={"Search for a class"} className="form-control"/>
                                <button className={"btn card ti-search my-2 my-sm-0"} title={"Search"}/>
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
                                                <img src={require('../user.png')} alt=""/>
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
                    <div className="container card">
                        <ValidForm className={"reviews-form mb-4"}
                                   nosubmit
                                   onSubmit={this.saveReview}>
                            <h4 className={"font-weight-bold"}>Write Review:</h4>
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
                                      name="className"
                                      id="className"
                                      placeholder={"Enter class name"}
                                      value={this.state.reviewClass}
                                      onChange={this.handleChangeClass}
                                      required
                                      minLength="2"
                                      // maxLength="100"
                            />

                            <label className={"font-weight-bold mt-4"}>Description</label>
                            <textarea rows={5}
                                      className={"form-control"}
                                      name="description"
                                      id="description"
                                      placeholder={"Enter your review"}
                                      value={this.state.reviewText}
                                      onChange={this.handleChangeText}
                                      required
                                      minLength="20"
                            />
                            <button className={"btn btn-primary mt-2"}
                                    type="submit"
                                    onClick={this.saveReview}
                                    disabled={!this.isEnabled()}
                            >
                                Save
                            </button>
                        </ValidForm>
                    </div>
                </Page>
            </div>
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
        onCreateReview: (review) => dispatch(reviewsActionCreator.createReview(review))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
