import React, {useState, useEffect} from 'react'
import Comment from "./Comment"
import axios from "../../../custom-axios"
import {Link} from "react-router-dom";

const Question = (props) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        axios.get(`/${props.id}/comments`).then((data) => {
            setComments(data.data)
        })
    }, []);

    const getComments = () => {
        return comments.length > 0 ? comments.map(comment => {
            return (
                <Comment key={comment.id} text={comment.content} date={comment.createdOn}/>
            )
        }) : (
            <div className={"text-center font-weight-bold"}>No comments inserted yet.</div>
        );
    };

    return (
        <div className={"question"}>
            <div className="question-holder">
                <div className="question-holder-header">
                    <div className="question-holder-header-left">
                        <img src={require('../../user.png')} />
                        <h5>{props.firstName} {props.lastName}</h5>
                    </div>
                    <div className="question-holder-header-right">
                        <Link to={"#"} className="ti-comment mr-1" title="Write an answer"/>
                        <button onClick={() => setShowComments(!showComments)}
                                className={`btn btn-link text-dark ${!showComments ? 'ti-angle-down' : 'ti-angle-up'}`}
                                title="Show answers"
                        />
                    </div>
                </div>
                <div className="question-holder-body">
                    <h6 className="text-left mt-4 ">{props.text}</h6>
                </div>
            </div>
            {
                showComments ? (
                    <div className="question-comments">
                        {getComments()}
                    </div>
                ) : null
            }
        </div>
    )
};

export default Question