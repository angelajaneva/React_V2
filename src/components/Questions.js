import React from 'react'
import Question from "./Question";
import {useParams} from "react-router-dom";

const Questions = (props) => {

    const {classId} = useParams();


    function getQuestions() {
        const newRef = props.questions.filter(question => {
            return question.aclass.id === classId;
        });

        return newRef.map(question => {
            return (
                <Question key={question.id} text={question.text} firstName={question.student.firstName}
                          lastName={question.student.lastName}/>
            )
        })
    }


    return (
        <div className={"wrapper d-flex align-items-stretch"}>
            <div id="content" className="p-4 p-md-5 pt-5">
                {/*<hr/>*/}
                <div className="my-sm-n3">
                    <div className="mt-4">
                        {getQuestions()}
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Questions;