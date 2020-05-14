import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ToDoForm from "./ToDoForm";
import 'rc-checkbox/assets/index.css';
import SearchInput, {createFilter} from 'react-search-input'
import Page from "../Views/Page";
import auth from "../../Authentication/auth";

const KEYS_TO_FILTERS = ['text'];

const Todo = (props) => {
    const [completed, setCompleted] = useState(false);
    const [uncompleted, setUncompleted] = useState(false);
    const [newTodo, setNewTodo] = useState(false);
    const [todo, setTodo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const completedHandler = () => {
        setCompleted(true);
        setUncompleted(false);
    };

    const uncompletedHandler = () => {
        setUncompleted(true);
        setCompleted(false);
    };

    const allHandler = () => {
        setUncompleted(false);
        setCompleted(false);
    };


    const getTodo = () => {

        const filteredTodos = props.todos.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

        return filteredTodos.map(todo => {
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
            "text": todo,
            "username": auth.getUsername()
        });
        setTodo("");
        setNewTodo(false);
    };

    const isEnabled = () => todo.length > 0;

    const searchUpdated = (term) => {
        setSearchTerm(term)
    };

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
                            <SearchInput className="search-todo"
                                         placeholder={"Search"}
                                         name={"searchTerm"}
                                         onChange={searchUpdated}/>
                            {/*<button className="btn-sm card ti-search my-2 my-sm-0"*/}
                            {/*        type="submit"*/}
                            {/*        onClick={searchHandler}>*/}
                            {/*</button>*/}
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
            {!completed && !uncompleted  && getTodo()}
        </Page>
    )
};

export default Todo;