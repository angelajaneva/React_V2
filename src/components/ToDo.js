import React from 'react'
import {Link} from "react-router-dom";
import ToDoForm from "./ToDoForm";
import 'rc-checkbox/assets/index.css';


const todo = (props) => {

    function getTodo() {
        return props.todos.map(todo => {
            return (
                <ToDoForm key={todo.id} todo={todo}
                          not={props.not} edit={props.edit} onClickHandler={props.onClickHandler}
                onSubmit={props.onSubmit}/>
            )
        })
    }


    return (
        <div className="bg-light" style={{width: '100%'}}>

            <div className="container mt-lg-n5 padding-top-bottom">
                <div className="float-right">
                    <p><Link to="#"><span className="pr-4">All</span></Link>
                        <Link to="#"><span className="pr-4">Uncompleted</span></Link>
                        <Link to="#"><span className="pr-4">Completed</span></Link>
                    </p>
                </div>
                {getTodo()}
            </div>
        </div>
    )
};

export default todo