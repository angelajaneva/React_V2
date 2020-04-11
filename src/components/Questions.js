import React from 'react'
import Question from "./Question";
import {useParams, useHistory} from "react-router-dom";

const Questions = (props) => {

    const {classId} = useParams();
    const history = useHistory();


    function getQuestions() {
        const newRef = props.questions.filter(question => {
            return question.aclass.id === classId;
        });

        return newRef.map(question => {
            return (
                <Question key={question.id} text={question.text} firstName={question.student.firstName}
                          lastName={question.student.lastName} id={question.id} comments={props.comments} show={props.show}/>
            )
        })
    }


    return (
        <div className={"wrapper d-flex align-items-stretch"}>
            <div id="content" className="p-4 p-md-5 pt-5">
                {/*<hr/>*/}
                <div className="my-sm-n3">
                    <div className="mt-4">
                        <div className="ml-4 form-inline">
                            <button className="btn-light card" style={{width: '30%'}} onClick={() => {
                                history.push("/question/new")
                            }}>Click to ask</button>
                            {/*<input type="text" className="card  ml-xl-5" placeholder=" Search"*/}
                            {/*       style={{width: '30%', height:''}}/>*/}
                        </div>
                        {getQuestions()}
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Questions;