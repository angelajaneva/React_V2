import React, {useState, useEffect} from 'react'
import Comment from "./Comment"
import axios from "../../../axios/custom-axios"
import axiosRepository from "../../../axios/axiosRepository"
import Highlighter from "react-highlight-words";
import auth from "../../../Authentication/auth";


const Question = (props) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        axios.get(`/${props.id}/comments`).then((data) => {
            setComments(data.data)
        });
    }, [props.id]);

    const getComments = () => {
        return comments.length > 0 ? comments.map(comment => {

            return (
                <Comment key={comment.id} text={comment.content}
                         date={comment.createdOn} student={comment.student}/>
            )
        }) : (
            <div className={"text-center font-weight-bold"}>No comments inserted yet.</div>
        );
    };

    const openCommentsForm = (e) => {
        e.preventDefault();
        setNewComment(!newComment);
        setShowComments(true);
    };

    const showCommentsList = (e) => {
        e.preventDefault();
        setNewComment(false);
        setShowComments(!showComments);
    };

    const saveComment = (e) => {
        e.preventDefault();
        const content = {
            "content": comment,
            "username": auth.getUsername()
        };
        axiosRepository.addComment(props.id, content).then((data) => {
            setComments(comments.concat(data.data));
        });
        setComment("");
        setNewComment(false);
        setShowComments(true);
    };

    const isEnabled = () => comment.length > 0;


    return (
        <div className={"question"}>
            <div className="question-holder">
                <div className="question-holder-header">
                    <div className="question-holder-header-left">
                        {/*<img src={require('../../user.png')} alt={"user"}/>*/}
                        <h5><Highlighter searchWords={[props.searchTerm]}
                                         textToHighlight={props.firstName + " "}
                                         highlightStyle={{backgroundColor: '#E7FF6A'}}/>
                            <Highlighter searchWords={[props.searchTerm]}
                                         textToHighlight={props.lastName}
                                         highlightStyle={{backgroundColor: '#E7FF6A'}}/>
                        </h5>
                    </div>
                    <div className="question-holder-header-right">
                        <button className="btn btn-link text-dark ti-comment mr-1"
                                title="Write an answer"
                                onClick={openCommentsForm}
                        />
                        <button onClick={showCommentsList}
                                className={`btn btn-link text-dark ${!showComments ? 'ti-angle-down' : 'ti-angle-up'}`}
                                title="Show answers"
                        />
                    </div>
                </div>
                <div className="question-holder-body">
                    <h6 className="text-left mt-4 ">
                        <Highlighter searchWords={[props.searchTerm]}
                                     textToHighlight={props.text}
                                     highlightStyle={{backgroundColor: '#E7FF6A'}}

                        />
                    </h6>
                </div>
            </div>
            {
                showComments ? (
                    <div>
                        {
                            newComment ? (
                                <div className={"questions-comment-form"}>
                                    <div className={"form-group m-0 w-100"}>
                                        <label className={"font-weight-bold"}>Type here to comment</label>
                                        <textarea rows="1"
                                                  placeholder={"Enter text"}
                                                  value={comment}
                                                  onChange={(e) => setComment(e.target.value)}
                                                  className={"form-control"}
                                        />
                                    </div>
                                    <button className={"btn btn-primary ml-1"}
                                            type="submit"
                                            onClick={saveComment}
                                            disabled={!isEnabled()}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="question-comments">
                                    {getComments()}
                                </div>
                            )
                        }
                    </div>
                ) : null
            }
        </div>
    )
};

export default Question