import React, {useEffect, useState} from 'react'
import Question from "./Question";
import axios from "../custom-axios";
import {useParams} from "react-router-dom";

const Questions = (props) => {

    const [questions, setQuestions] = useState([]);
    const {classId} = useParams();

    useEffect(() => {
        axios.get("/" + classId + "/questions").then(data => {
            setQuestions(data.data)
        })
    }, []);


    function getQuestions() {
        return questions.map(question => {
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