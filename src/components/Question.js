import React from 'react'
import Comment from "./Comment"

const Question = (props) => {
    return (
        <div>
            <div className="w-card-4 mt-4">
                <div className="w-container">
                    <div className="img bg-wrap ">
                        <div className="user-logo fa-pull-left pr-xl-5">
                            <div className="img" style={{backgroundImage: 'url(' + require('./user.png') + ')'}}/>
                        </div>
                    </div>
                    <h6 className="text-left mt-4 ">{props.text}</h6>
                    <a className="ti-angle-down fa-pull-right mt-lg-n5"/>
                    <p>by {props.firstName} {props.lastName}</p>
                    <footer className="w-container">
                        <hr/>
                        <div className="text-right">
                            <a className="ti-share pr-4"/>
                            <a className="ti-comment"/>
                        </div>
                    </footer>

                </div>
            </div>
            <div className="mt-lg-n3">
                <Comment/>
            </div>
            <br/> <hr/> <br/>
        </div>
    )
};

export default Question