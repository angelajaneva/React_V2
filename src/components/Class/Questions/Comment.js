import React from 'react'

const Comment = (props) => {
    return (
        <div className="comment">
            <div className="comment-body">
                <p>{props.text}</p>

            </div>
            <hr/>
            <div className="comment-footer">
                <div>
                    <span className={"written"}>Written by:</span> <span className={"mr-2"}>
                    {/*{props.student.firstName !== null ? props.student.firstName + " " + props.student.lastName : ""}*/}
                </span>
                </div>
                <div>
                    {/*<a className="ti-thumb-up pr-3"/>*/}
                    {/*<a className="ti-thumb-down"/>*/}
                </div>
            </div>
        </div>
    )
};

export default Comment;