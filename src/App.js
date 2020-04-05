import React, {Component} from 'react';
import './App.css';
import './components/Header'
import Header from './components/Header';
import Home from './components/Home'
import Sidebar from "./components/Sidebar";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import NoteEdit from "./components/NoteEdit";
import Cards from "./components/Cards";
import Questions from "./components/Questions";
import service from './axiosRepository'
import NoteAdd from "./components/NoteAdd"
import ToDo from "./components/ToDo"
import Content from "./components/Content";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            questions: [],
            classes: [],
            toDos: [],
            editingTodo: false,
            notEditing: true
        }
    }

    componentDidMount() {
        this.loadingNotes();
        this.loadingQuestions();
        this.getClassesForStudent();
        this.loadingTodos();
    }


    loadingNotes = () => {
        service.getNotes().then(response => {
            this.setState({
                "notes": response.data
            });
        })
    };


    loadingQuestions = () => {
        service.getQuestions().then(response => {
            this.setState({
                "questions": response.data
            });
        })
    };

    getClassesForStudent = () => {
        service.getClasses().then(response => {
            this.setState({
                "classes": response.data
            })
        })
    };

    loadingTodos = () => {
        service.getToDo().then(response => {
            this.setState({
                "toDos": response.data
            })
        })
    };

    createNote = (newNote) => {
        service.addNote(newNote).then((response) => {
            const newNote = response.data;
            this.setState((prevState) => {
                const newNoteRef = [...prevState.notes, newNote];
                return {
                    "notes": newNoteRef
                }
            });
        });
    };

    updateNotes = ((editedNote) => {
        service.updateNote(editedNote).then(this.loadingNotes)
    });

    deleteNotes = ((noteId) => {
        service.deleteNote(noteId).then(this.loadingNotes)
    });

    updateToDo = ((edited) => {
        service.updateTodo(edited).then(this.loadingTodos)
    });

    clickForEdit = () => {
        this.setState({
            ...this.state,
            notEditing: !this.state.notEditing,
            editingTodo: !this.state.editingTodo
        })
    };


    render() {
        return (
            <div>
                <Router>

                    <Route path={"/"} exact render={() =>
                        <div>
                            <Header/>
                            <Home/>
                        </div>}>
                    </Route>

                    <Route path={"/home"} >
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.state.classes}/>
                        </div>
                        {/*<Cards onPageClick={this.loadingNotes} obj={this.state.notes}*/}
                        {/*       subjects={this.state.classes} onDelete={this.deleteNotes}/>}>*/}
                    </Route>

                    <Route path={"/classes/:classId"} exact render={(props) =>
                        <Redirect to={"/" + props.match.params.classId + "/notes"}/>
                    }/>

                    <Route path={"/:classId/notes"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"} id="">
                            <Sidebar subjects={this.state.classes}/>
                            <div id="content" className="p-4 p-md-5 pt-5">
                                <Content id={props.match.params.classId}/>
                                <Cards onDelete={this.deleteNotes}/>
                            </div>
                        </div>
                    }/>

                    <Route path={"/:classId/questions"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"} id="">
                            <Sidebar subjects={this.state.classes}/>
                            <div id="content" className="p-4 p-md-5 pt-5">
                                <Content id={props.match.params.classId}/>
                                <Questions/>
                            </div>
                        </div>
                    }/>


                    <Route path={"/:classId/:noteId/edit"} exact render={(props) =>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.state.classes}/>
                            <div id="content" className="p-4 p-md-5 pt-5">
                                <Content id={props.match.params.classId}/>
                                <NoteEdit onSubmitt={this.updateNotes} id={props.match.params.classId}/>
                            </div>
                        </div>

                    }/>

                    <Route path={"/note/new"} exact>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.state.classes}/>
                            <NoteAdd onNewTermAdded={this.createNote}/>
                        </div>
                    </Route>

                    <Route path={"/todo"}>
                        <div className={"wrapper d-flex align-items-stretch"} id="content">
                            <Sidebar subjects={this.state.classes}/>
                            <ToDo todos={this.state.toDos} edit={this.state.editingTodo}
                                  not={this.state.notEditing} onClickHandler={this.clickForEdit}
                                  onSubmit={this.updateToDo}/>
                        </div>
                    </Route>

                </Router>
            </div>

        )
    }
}

export default App;
