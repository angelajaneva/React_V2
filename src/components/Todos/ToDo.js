import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ToDoForm from "./ToDoForm";
import 'rc-checkbox/assets/index.css';
import Page from "../Views/Page";

const Todo = (props) => {
    const [completed, setCompleted] = useState(false);
    const [uncompleted, setUncompleted] = useState(false);
    const [searched, setSearched] = useState(false);
    const [newTodo, setNewTodo] = useState(false);
    const [todo, setTodo] = useState("");

    const completedHandler = () => {
        setCompleted(true);
        setUncompleted(false);
        setSearched(false);
    };

    const uncompletedHandler = () => {
        setUncompleted(true);
        setCompleted(false);
        setSearched(false);
    };

    const allHandler = () => {
        setUncompleted(false);
        setCompleted(false);
        setSearched(false);
    };

    const searchHandler = () => {
        setSearched(true);
        setCompleted(false);
        setSearched(false);
    };

    const onSearch = (e) => {
        e.preventDefault();
        props.onSearch(e.target["searchTerm"].value);
    };

    const getTodo = () => {
        return props.todos.map(todo => {
            return (
                <ToDoForm key={todo.id}
                          todo={todo} onSubmit={props.onSubmit}
                          onDelete={props.onDelete}/>
            )
        })
    };

    const getSearchedTodos = () => {
        return props.searchedToDos.map(todo => {
            return (
                <ToDoForm key={todo.id}
                          todo={todo} onSubmit={props.onSubmit}
                          onDelete={props.onDelete}/>
            )
        })
    };


    const getTodoCompleted = () => {
        const newRef = props.todos.filter(todo => todo.completed === true);

        return newRef.map(todo => {
            return (
                <ToDoForm key={todo.id}
                          todo={todo} onSubmit={props.onSubmit}
                          onDelete={props.onDelete}/>
            )
        })
    };

    const getTodoUncompleted = () => {
        const newRef = props.todos.filter(todo => todo.completed === false);

        return newRef.map(todo => {
            return (
                <ToDoForm key={todo.id}
                          todo={todo} onSubmit={props.onSubmit}
                          onDelete={props.onDelete}/>
            )
        })
    };

    const addNewTodo = () => {
        setNewTodo(!newTodo);
    };

    const saveTodo = (e) => {
        e.preventDefault();

        props.onCreateToDo({
            "text": todo
        });
        setTodo("");
        setNewTodo(false);
    };

    const isEnabled = () => todo.length > 0;

    return (
        <Page title={"Todos"}>
            <div className={"todos-options"}>
                <div className={"todos-options-left"}>
                    <button className="btn btn-primary"
                            onClick={addNewTodo}>
                        <i className={"fa fa-plus"} aria-hidden="false"/> New Todo
                    </button>
                </div>
                <div className={"todos-options-right"}>
                    <Link to="#" onClick={allHandler}>All</Link>
                    <Link to="#" onClick={uncompletedHandler}>Uncompleted</Link>
                    <Link to="#" onClick={completedHandler}>Completed</Link>
                    <div className={"todos-options-search"}>
                        <form className="form-inline mt-2 mt-md-0" onSubmit={onSearch}>
                            <input className="form-control"
                                   placeholder={"Search"}
                                   name={"searchTerm"}/>
                            <button className="btn card ti-search my-2 my-sm-0"
                                    type="submit"
                                    onClick={searchHandler}>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {
                newTodo ? (
                    <div className="todos-form">
                        <div className={"form-group m-0 w-100"}>
                            <label className="font-weight-bold">Write a ToDo</label>
                            <textarea rows="1"
                                      placeholder={"Enter text"}
                                      value={todo}
                                      onChange={(e) => setTodo(e.target.value)}
                                      className={"form-control"}
                            />
                        </div>
                        <button className={"btn btn-primary ml-1"}
                                onClick={saveTodo}
                                disabled={!isEnabled()}
                        >
                            Save
                        </button>
                    </div>
                ) : null
            }
            {completed && getTodoCompleted()}
            {uncompleted && getTodoUncompleted()}
            {searched && getSearchedTodos()}
            {!completed && !uncompleted && !searched && getTodo()}
        </Page>
    )
};

export default Todo;