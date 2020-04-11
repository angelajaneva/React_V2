import React from 'react'
import {Link} from "react-router-dom";
import ToDoForm from "./ToDoForm";
import 'rc-checkbox/assets/index.css';
import Page from "../Views/Page";

const Todo = (props) => {
    const getTodo = () => {
        return props.todos.map(todo => {
            return (
                <ToDoForm key={todo.id}
                          todo={todo}
                />
            )
        })
    };

    const addNewTodo = () => {
        // save new todo here;
    };

    return (
        <Page title={"Todos"}>
            <div className={"todos-options"}>
                <div className={"todos-options-left"}>
                    <button className="btn btn-primary"
                            onClick={addNewTodo}
                    >
                        <i className={"fa fa-plus"} aria-hidden="false"></i> New Todo
                    </button>
                </div>
                <div className={"todos-options-right"}>
                    <Link to="#">All</Link>
                    <Link to="#">Uncompleted</Link>
                    <Link to="#">Completed</Link>
                    <div className={"todos-options-search"}>
                        <input className="form-control" placeholder={"Search"} />
                    </div>
                </div>
            </div>
            {getTodo()}
        </Page>
    )
};

export default Todo;