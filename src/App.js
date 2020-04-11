import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";
import * as noteActionCreator from './store/actions/note'
import * as questionActionCreator from './store/actions/questions'
import * as classesActionCreator from './store/actions/classes'
import * as toDoActionCreator from './store/actions/todos'

import './App.css';
import './components/Header'
import Header from './components/Header';
import Home from './components/Home'
import Sidebar from "./components/Sidebar";
import NoteEdit from "./components/NoteEdit";
import Notes from "./components/Class/Notes/Notes";
import Questions from "./components/Questions";
import NoteAdd from "./components/NoteAdd"
import ToDo from "./components/Todos/ToDo"
import Content from "./components/Class/Content";
import QuestionAdd from "./components/QuestionAdd";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingTodo: false,
            notEditing: true,
            showComments: false
        }
    }

    componentDidMount() {
        this.props.loadingNotes();
        this.props.loadingQuestions();
        this.props.loadClasses();
        // this.props.loadToDos();
    }


    clickForEdit = () => {
        this.setState({
            ...this.state,
            notEditing: !this.state.notEditing,
            editingTodo: !this.state.editingTodo
        })
    };

    clickForComments = () => {
        this.setState({
            ...this.state,
            showComments: !this.state.showComments
        })
    };

//sekade kaj so se koriste this.state.notes sea da se zamene so this.props.nts
//sekade kaj so ima this.createNote --> this.props.onCreateNote isto za site metodi
    render() {
        return (
            <div className={"app-wrapper"}>
                <Router>

                    <Route path={"/"} exact render={() =>
                        <div>
                            <Header/>
                            <Home/>
                        </div>}>
                    </Route>

                    <Route path={"/home"}>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                        </div>
                        {/*<Cards onPageClick={this.loadingNotes} obj={this.state.notes}*/}
                        {/*       subjects={this.state.classes} onDelete={this.deleteNotes}/>}>*/}
                    </Route>

                    <Route path={"/classes/:classId"} exact render={(props) =>
                        <Redirect to={"/" + props.match.params.classId + "/notes"}/>
                    }/>

                    <Route path={"/:classId/notes"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"}>
                            <Sidebar subjects={this.props.classes}/>
                            <Notes cards={this.props.notes}
                                   id={props.match.params.classId}
                                   onDelete={this.props.onDeleteNote}
                            />
                        </div>
                    }/>

                    <Route path={"/:classId/questions"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"} id="">
                            <Sidebar subjects={this.props.classes}/>
                            <div id="content" className="p-4 p-md-5 pt-5">
                                <Content id={props.match.params.classId}/>
                                <Questions questions={this.props.questions} comments={this.clickForComments}
                                           show={this.state.showComments} onDelete={this.props.onDeleteQuestion}/>
                            </div>
                        </div>
                    }/>


                    <Route path={"/:classId/:noteId/edit"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <div id="content" className="p-4 p-md-5 pt-5">
                                <Content id={props.match.params.classId}/>
                                <NoteEdit onSubmit={this.props.onUpdateNote} id={props.match.params.classId}/>
                            </div>
                        </div>

                    }/>

                    <Route path={"/note/new"} exact>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <NoteAdd onNewTermAdded={this.props.onCreateNote}/>
                        </div>
                    </Route>

                    <Route path={"/question/new"} exact>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <QuestionAdd onNewTermAdded={this.props.onCreateQuestion}/>
                        </div>
                    </Route>


                    <Route path={"/todo"}>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <ToDo todos={this.props.toDos} edit={this.state.editingTodo}
                                  not={this.state.notEditing} onClickHandler={this.clickForEdit}
                                  onSubmit={this.props.onUpdateToDo}/>
                        </div>
                    </Route>

                </Router>
            </div>

        )
    }
}

//which property should hold which slide of the state
const mapStateToProps = (state) => {
    return {
        notes: state.classReducer.notes,
        questions: state.classReducer.questions,
        classes: state.classReducer.classes,
        toDos: state.toDoReducer.toDos
    }
};
//receives the dispatch function as arg
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateNote: (note) => dispatch(noteActionCreator.addNotes(note)),
        onDeleteNote: (id) => dispatch(noteActionCreator.deleteNotes(id)),
        onUpdateNote: (note) => dispatch(noteActionCreator.updateNotes(note)),
        loadingNotes: () => dispatch(noteActionCreator.loadNotes()),
        onCreateQuestion: (question) => dispatch(questionActionCreator.addQuestions(question)),
        onDeleteQuestion: (id) => dispatch(questionActionCreator.deleteQuestions(id)),
        loadingQuestions: () => dispatch(questionActionCreator.loadQuestions()),
        loadClasses: () => dispatch(classesActionCreator.loadClassesForStudent()),
        onUpdateToDo: (toDo) => dispatch(toDoActionCreator.updateToDo(toDo)),
        loadToDos: () => dispatch(toDoActionCreator.loadToDos()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
