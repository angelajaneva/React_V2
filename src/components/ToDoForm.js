import React, {useEffect, useState} from 'react'
import Checkbox from "rc-checkbox";
import axios from "../custom-axios";
import {useHistory} from "react-router-dom";

const Form = (props) => {

    const history = useHistory();
    const [toDo, setToDo] = useState({});
    const [text, setText] = useState("");
    const todoId = props.todo.id;

    useEffect(() => {
        axios.get("/todo/" + todoId).then((data) => {
            setToDo(data.data);
            // setText(data.data.text)
        })
    }, []);


    const onFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            "id": todoId,
            "text": text,
            "done": e.target.complete.checked
        });

        history.push("/todo");
    };

    const onChangeHandler = (e) => {
        const paramValue = e.target.text;
        setToDo({paramName: paramValue});
        setText(e.target.text)
        {console.log("vo handler " + e.target.text.value)}
    };


    return (
        <div className="w-card-6 mt-5">
            <div className="w-container">
                <form onSubmit={onFormSubmit}>
                    <p><Checkbox className="pr-2" checked={props.todo.completed} name={"complete"}/>
                        <small>{props.todo.date}</small>
                        <span className="float-right">
                                <button className="btn-sm card ti-close"/>
                    </span>
                        <span className="float-right">
                        <button type={props.edit ? "submit" : ""}
                                className={props.not ? "btn-sm card ti-pencil-alt2" : "btn-sm card ti-check"}
                                onClick={props.onClickHandler}/>
                    </span></p>
                    {props.not && <p>{props.todo.text}{console.log("vo drug del")}</p>}
                    {/*//tuka e problemot posto e conditional rendering, treba inputot da se smeste vo nesto*/}
                    {/*//i na formSumbit da ne bide e.target.text... tuku toa vo koe kje bide smesten inputot*/}
                    {props.edit && <div className="">
                        <div className="form-group">
                            <textarea name={"text"} className="form-control" rows="7"
                            value={toDo.text} onChange={onChangeHandler} />
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    )
};

export default Form;