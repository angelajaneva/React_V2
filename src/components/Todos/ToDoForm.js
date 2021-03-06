import React, {useEffect, useState} from 'react'
import Checkbox from "rc-checkbox";
import axios from "../../axios/custom-axios";

const Form = (props) => {
    const [checked, setChecked] = useState(props.todo.completed);
    const [toDo, setToDo] = useState({});
    const [text, setText] = useState("");
    const todoId = props.todo.id;
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        axios.get("/todo/" + todoId).then((data) => {
            setToDo(data.data);
        })
    },
        [todoId]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            "todoId": todoId,
            "text": text,
            "done": checked
        });
        checkIsEdit();
    };

    const onChangeHandler = (e) => {
        const paramValue = e.target.value || e.target.checked;
        setToDo({...toDo, [e.target.name]: paramValue});
        setText(e.target.value)
    };

    const checkIsEdit = () => {
        setIsEdit(!isEdit);
    };

    const checkboxCheck = (e) => {
        setChecked(e.target.checked);
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        props.onDelete(todoId);
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
                                <button className="btn-sm card ti-trash"
                                        onClick={deleteHandler}
                                />
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