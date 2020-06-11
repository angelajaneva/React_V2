import React from 'react'

const Review = (props) => {
    return (
        <div className={"review"}>
            <div className="review-holder">
                <div className="review-holder-header">
                    <div className="review-holder-header-left">
                        {/*<img src={require('../user.png')} alt=""/>*/}
                        <h6>{props.firstName} {props.lastName} about
                            <span className="font-weight-bolder"> {props.aclass}</span>
                        </h6>
                    </div>
                    <div className="review-holder-header-right">
                        <button className="btn btn-link text-warning">
                            <i className={"fa fa-star mr-1"} aria-hidden="false"/>
                            <span className={"rate"}>{props.rated}/5</span>
                            <br/><span><small>{props.createdOn}</small></span>
                        </button>
                    </div>
                </div>
                <div className="review-holder-body">
                    {props.text}
                </div>
            </div>
        </div>
    )
};

export default Review