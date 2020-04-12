import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {useParams} from "react-router-dom";
import Page from "../../Views/Page";
import Navigation from "../Navigation";

const Questions = (props) => {
    const {classId} = useParams();
    const [name, setName] = useState();

    useEffect(() => {
        let getClass = props.classes.filter(item => item.id === props.id)[0];

        if(getClass){
            setName(getClass.name);
        }
    });

    function getQuestions() {
        const newRef = props.questions.filter(question => {
            return question.aclass.id === classId;
        });

        return newRef.map(question => {
            return (
                <Question key={question.id}
                          text={question.text}
                          firstName={question.student.firstName}
                          lastName={question.student.lastName}
                          id={question.id}
                          comments={props.comments}
                          show={props.show}
                />
            )
        })
    }

    return (
        <Page title={name} styles={"content"}>
            <Navigation classId={classId} />
            {getQuestions()}
        </Page>
    )
};

export default Questions;