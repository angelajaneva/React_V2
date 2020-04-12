import React from 'react'

const Comment = () => {
    return (
        <div className="comment">
            <div className="comment-body">
                <p>In this chapter, we first study the fundamentals of the relational model. A" +
                    "substantial theory exists for relational databases.We study the part of this theory " +
                    "dealing with queries in Chapter 6. In Chapters 7 through 8, we shall examine " +
                    "aspects of database theory that help in the design of relational database schemas, " +
                    "while in Chapters 12 and 13we discuss aspects of the theory dealingwith efficient " +
                    "processing of queries.</p>

            </div>
            <hr/>
            <div className="comment-footer">
                <div>
                    <span className={"written"}>Written by:</span> <span className={"mr-2"}>Username</span>
                </div>
                <div>
                    <a className="ti-thumb-up pr-3"/>
                    <a className="ti-thumb-down"/>
                </div>
            </div>
        </div>
    )
};

export default Comment;