import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {useParams} from "react-router-dom";
import Page from "../../Views/Page";
import Navigation from "../Navigation";

const Questions = (props) => {
    const {classId} = useParams();
    const [name, setName] = useState();
    const [addQuestionForm, setAddQuestionForm] = useState(false);
    const [questionText, setQuestionText] = useState("");

    useEffect(() => {
        let getClass = props.classes.filter(item => item.id === props.id)[0];

        if(getClass){
            setName(getClass.name);
        }
    }, [props.classes, props.id, setName]);

    const getQuestions = () =>{
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
    };

    const openAddQuestionForm = () => {
        setAddQuestionForm(!addQuestionForm);
    };

    const saveQuestion = (e) => {
        e.preventDefault();

        props.onCreate({
            "classId": classId,
            "text": questionText
        });

        setQuestionText("");
        setAddQuestionForm(false);
    };

    return (
        <Page title={name} styles={"content"}>
            <Navigation classId={classId} formOpen={openAddQuestionForm} />
            {
                addQuestionForm ? (
                    <div className={"question-form"}>
                        <div className={"form-group m-0 w-100"}>
                            <label className="font-weight-bold">Write a Question</label>
                            <textarea rows="3"
                                      placeholder={"Make sure what you're asking is unique, concise and phrased like a question."}
                                      value={questionText}
                                      onChange={(e) => setQuestionText(e.target.value)}
                                      className={"form-control"}
                            />
                        </div>
                        <button className={"btn btn-primary ml-1"}
                                onClick={saveQuestion}
                        >
                            Save
                        </button>
                    </div>
                ) : null
            }
            {getQuestions()}
            {/*<h6 className="text-right"><i>*/}
            {/*    </i>*/}
            {/*</h6><br/>*/}

        </Page>
    )
};

export default Questions;