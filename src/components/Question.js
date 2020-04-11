import React, {useState, useEffect} from 'react'
import Comment from "./Comment"
import axios from "../custom-axios"
import {Link} from "react-router-dom";

const Question = (props) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get("/" + props.id + "/comments").then((data) => {
            setComments(data.data)
        })
    }, []);

    const getComments = () => {
        return comments.map(comment => {
            return (
                <Comment key={comment.id} text={comment.content} date={comment.createdOn}/>
            )
        })
    };

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
                    <a onClick={props.comments} className="ti-angle-down fa-pull-right mt-lg-n5"
                                                title="Show answers"/>
                    <p>by {props.firstName} {props.lastName}</p>
                    <footer className="w-container">
                        <hr/>
                        <div className="text-right">
                            {/*<a className="ti-share pr-4"/>*/}
                            <Link to={"#"} className="ti-comment" title="Write an answer"/>
                        </div>
                    </footer>

                </div>
            </div>
            <div className="mt-lg-n3">

                 {props.show && getComments()}
                {/*<Comment/>*/}
                {console.log(props.show)}
            </div>
            <br/>
            <hr/>
            <br/>
        </div>
    )
};

export default Question