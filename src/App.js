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
import Notes from "./components/Class/Notes/Notes";
import Questions from "./components/Class/Questions/Questions";
import ToDo from "./components/Todos/ToDo"
import QuestionAdd from "./components/QuestionAdd";
import Reviews from "./components/Reviews/Reviews";

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
        this.props.loadToDos();
    }

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
                    </Route>
                    <Route path={"/classes/:classId"} exact render={(props) =>
                        <Redirect to={"/" + props.match.params.classId + "/notes"}/>
                    }/>
                    <Route path={"/:classId/notes"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"}>
                            <Sidebar subjects={this.props.classes}/>
                            <Notes cards={this.props.notes}
                                   classes={this.props.classes}
                                   id={props.match.params.classId}
                                   onDelete={this.props.onDeleteNote}
                                   onNewTermAdded={this.props.onCreateNote}
                                   loadNotes={this.props.loadingNotes}
                                   updateNote={this.props.onUpdateNote}
                            />
                        </div>
                    }/>
                    <Route path={"/:classId/questions"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"}>
                            <Sidebar subjects={this.props.classes}/>
                            <Questions questions={this.props.questions}
                                       classes={this.props.classes}
                                       id={props.match.params.classId}
                                       comments={this.clickForComments}
                                       show={this.state.showComments}
                                       onDelete={this.props.onDeleteQuestion}
                            />
                        </div>
                    }/>
                    <Route path={"/question/new"} exact>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <QuestionAdd onNewTermAdded={this.props.onCreateQuestion}/>
                        </div>
                    </Route>
                    <Route path={"/todo"}>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <ToDo todos={this.props.toDos}
                                  onDelete={this.props.onDeleteToDo}
                                  onSubmit={this.props.onUpdateToDo}
                                  onSearch={this.props.onSearchToDo}
                                  onCreateToDo={this.props.onCreateToDo}
                                  searchedToDos={this.props.searched_toDos}
                            />
                        </div>
                    </Route>
                    <Route path={"/reviews"}>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.props.classes}/>
                            <Reviews />
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
        toDos: state.toDoReducer.toDos,
        searched_toDos: state.toDoReducer.searched_toDos
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
        onUpdateToDo: (toDo) => dispatch(toDoActionCreator.updateToDos(toDo)),
        loadToDos: () => dispatch(toDoActionCreator.loadToDos()),
        onDeleteToDo: (id) => dispatch (toDoActionCreator.deleteToDos(id)),
        onCreateToDo: (toDo) => dispatch (toDoActionCreator.createToDos(toDo)),
        onSearchToDo: (term) => dispatch (toDoActionCreator.searchToDos(term))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
