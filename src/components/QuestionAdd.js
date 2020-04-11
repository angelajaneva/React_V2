import React from 'react'
import {useHistory} from "react-router-dom";
import Navigation from "./Navigation";

const QuestionAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            "classId": e.target.classID.value,
            "text": e.target.text.value,
        };

        props.onNewTermAdded(newQuestion);
        history.push("/" + newQuestion.classId + "/questions");
    };


    return (
        <div className="w-card-4 p-4 p-md-5 pt-5" id="content">
            <Navigation/>

            <div className="mt-4 card card-warning">
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <div className="">
                            {/*// <!-- text input -->*/}
                            <div className="form-group">
                                <label>Class ID</label>
                                <input type="text" name={"classID"} className="form-control" placeholder="Enter ..."
                                />
                            </div>
                        </div>

                        <div className="">
                            {/*// <!-- textarea -->*/}
                            <div className="form-group">
                                <label>Question?</label>
                                <textarea name={"text"} className="form-control" rows="5"/>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <button type="submit" className="btn btn-light">Submit</button>
                            <button type="submit" className="btn btn-light float-right"
                                    onClick={history.push("/home")}>Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
};

export default QuestionAdd