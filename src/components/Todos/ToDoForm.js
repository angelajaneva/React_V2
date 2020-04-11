import React, {useEffect, useState} from 'react'
import Checkbox from "rc-checkbox";
import axios from "../../custom-axios";

const Form = (props) => {
    const [checked, setChecked] = useState(props.todo.completed);
    const [toDo, setToDo] = useState({});
    const [text, setText] = useState("");
    const todoId = props.todo.id;
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        axios.get("http://all.local/_Projects/Freelancing/angrus/api/todo.php?todo=" + todoId).then((data) => {
            setToDo(data.data);
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        axios.get("post-url", {
            "id": todoId,
            "text": text,
            "done": checked
        })
            .then(response => {
                checkIsEdit();
            });

    };

    const onChangeHandler = (e) => {
        const paramValue = e.target.text;
        setToDo({paramName: paramValue});
        setText(e.target.text)
    };

    const checkIsEdit = () => {
        setIsEdit(!isEdit);
    };

    const checkboxCheck = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div className="todo">
            <div className="todo-wrapper">
                <div className="todo-header">
                    <div className="todo-header-title">
                        <Checkbox className="pr-2" checked={checked} onChange={checkboxCheck} name={"complete"}/>
                        <small>{props.todo.date}</small>
                    </div>
                    <div className="todo-header-options">
                        {
                            isEdit ? (
                                <button type={"submit"}
                                        className={"btn-sm card ti-check"}
                                        onClick={onFormSubmit}
                                />
                            ) : (
                                <button type={"button"}
                                        className={"btn-sm card ti-pencil-alt2"}
                                        onClick={checkIsEdit}
                                />
                            )
                        }
                        {
                            isEdit ? (
                                <button className="btn-sm card ti-close"
                                        onClick={checkIsEdit}
                                />
                            ) : (
                                <button className="btn-sm card ti-trash" />
                            )
                        }
                    </div>
                </div>
                <div className="todo-body">
                    {
                        !isEdit ?
                            props.todo.text :
                            (
                                <div className="form-group">
                                        <textarea name={"text"}
                                                  className="form-control"
                                                  rows="5"
                                                  value={toDo.text}
                                                  onChange={onChangeHandler}
                                        />
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
};

export default Form;