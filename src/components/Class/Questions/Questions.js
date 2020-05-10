import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {useParams} from "react-router-dom";
import Page from "../../Views/Page";
import Navigation from "../Navigation";
import SearchInput, {createFilter} from 'react-search-input'
import ValidForm from "react-valid-form-component";
import auth from "../../../Authentication/auth";

const KEYS_TO_FILTERS = ['text', 'student.firstName', 'student.lastName'];

const Questions = (props) => {
    const {classId} = useParams();
    const [name, setName] = useState();
    const [addQuestionForm, setAddQuestionForm] = useState(false);
    const [questionText, setQuestionText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let getClass = props.classes.filter(item => item.id === props.id)[0];

        if (getClass) {
            setName(getClass.name);
        }
    }, [props.classes, props.id]);

    const getQuestions = () => {
        const newRef = props.questions.filter(question => {
            return question.aclass.id === classId;
        });

        const filteredQuestions = newRef.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

        return filteredQuestions.map(question => {
            return (
                <Question key={question.id}
                          text={question.text}
                          firstName={question.student.firstName}
                          lastName={question.student.lastName}
                          id={question.id}
                          comments={props.comments}
                          show={props.show}
                          searchTerm={searchTerm}
                />
            )
        })
    };

    const searchUpdated = (term) => {
        setSearchTerm(term)
    };


    const openAddQuestionForm = () => {
        setAddQuestionForm(!addQuestionForm);
    };

    const saveQuestion = (e) => {
        // e.preventDefault();

        props.onCreate({
            "classId": classId,
            "text": questionText,
            "username": auth.getUsername()
        });

        setQuestionText("");
        setAddQuestionForm(false);
    };

    return (
        <Page title={name} styles={"content"}>
            <Navigation classId={classId} formOpen={openAddQuestionForm}/>
            {
                addQuestionForm ? (
                    <ValidForm nosubmit
                               onSubmit={saveQuestion}>
                        <div className={"question-form"}>
                            <div className={"form-group m-0 w-100"}>
                                <label className="font-weight-bold">Write a Question</label>
                                <textarea rows="3"
                                          name="add-question"
                                          id="add-question"
                                          placeholder={"Make sure what you're asking is unique, concise and phrased like a question."}
                                          value={questionText}
                                          onChange={(e) => setQuestionText(e.target.value)}
                                          className={"form-control"}
                                          required
                                          minLength="10"
                                />
                            </div>
                            <button className={"btn btn-primary ml-1"}
                                    type="submit"
                                    // onClick={saveQuestion}
                            >
                                Save
                            </button>
                        </div>
                    </ValidForm>

                ) : null
            }
            <SearchInput className="form-control pb-5 search-input" onChange={searchUpdated}/>
            {getQuestions()}
        </Page>
    )
};

export default Questions;