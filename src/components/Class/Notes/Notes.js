import React, {useState, useEffect} from 'react'
import Note from "./Note";
import Navigation from "../Navigation";
import Page from "../../Views/Page";
import {useParams} from "react-router-dom";
import SearchInput, {createFilter} from 'react-search-input'
import Highlighter from "react-highlight-words";
import AddForm from "./AddForm";


const KEYS_TO_FILTERS = ['title', 'description'];

const Notes = (props) => {
    const {classId} = useParams();
    const [name, setName] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        let getClass = props.classes.filter(item => item.id === props.id)[0];

        if (getClass) {
            setName(getClass.name);
        }
    }, [props.classes, props.id]);

    const openNote = (note = null, isEdit = false, isNew = false) => {
        setIsEdit(isEdit);
        setIsNew(isNew);

        setTitle("");
        setDescription("");
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
            setId(note.id)
        }
    };

    const searchUpdated = (term) => {
        setSearchTerm(term)
    };

    const saveNote = () => {

        let note = {
            "noteId": id,
            "classId": classId,
            "title": title,
            "description": description
        };

        if (isNew) {
            setTitle("");
            setDescription("");
            props.onNewTermAdded(note);
        } else {
            props.updateNote(note);
        }

        setIsEdit(false);
        setIsNew(false);
        // props.loadNotes();
    };

    const getNotes = () => {
        const newRef = props.cards.filter(note => {
            return note.aclass.id === classId;
        });

        const filteredNotes = newRef.filter(createFilter(searchTerm, KEYS_TO_FILTERS));


        return filteredNotes.map(note => {
            return (
                <Note key={note.id}
                      note={note}
                      onDelete={props.onDelete}
                      classId={classId}
                      openNote={openNote}
                      searchTerm={searchTerm}
                />
            )
        })

    };

    return (
        <Page title={name} styles={"content"}>
            <Navigation classId={classId}/>
            <div className="notes-list">
                <div className={"notes-list-holder"}>
                    <SearchInput className="search-control form-control search-input"
                                 onChange={searchUpdated}/>
                    {getNotes()}
                </div>

                <div className={"notes-list-read"}>
                    <div className={"notes-list-read-options"}>
                        <button className={"btn btn-primary"} onClick={() => openNote(null, true, true)}>
                            <i className={"fa fa-plus"} aria-hidden="false"/> Add Note
                        </button>
                    </div>
                    <div className={"notes-list-read-body"}>
                        {
                            isEdit ? (
                                isNew ? (
                                    <div>
                                        <AddForm saveNote={saveNote}
                                                 title={title}
                                                 setTitle={setTitle}
                                                 description={description}
                                                 setDescription={setDescription}
                                                 openNote={openNote}/>
                                    </div>
                                ) : (
                                    <div>
                                        <div className={"form-group"}>
                                            <label className="font-weight-bold">Title</label>
                                            <input type={"text"}
                                                   className={"form-control"}
                                                   placeholder={"Enter title"}
                                                   value={title}
                                                   onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className={"form-group"}>
                                            <label className="font-weight-bold">Description</label>
                                            <textarea rows={"5"}
                                                      className={"form-control"}
                                                      placeholder={"Enter title"}
                                                      value={description}
                                                      onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className={"form-group text-right"}>
                                            <button className={"btn btn-primary mr-1"}
                                                    onClick={() => openNote(null, false, false)}
                                            >
                                                Close
                                            </button>
                                            <button className={"btn btn-primary"}
                                                    onClick={saveNote}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>

                                )) : (
                                <div>
                                    {
                                        title && description ? (
                                            <div>
                                                <h3>{<Highlighter searchWords={[searchTerm]}
                                                                  textToHighlight={title}
                                                                  highlightStyle={{backgroundColor: '#E7FF6A'}}

                                                />
                                                }
                                                </h3>
                                                <div>{<Highlighter searchWords={[searchTerm]}
                                                                   textToHighlight={description}
                                                                   highlightStyle={{backgroundColor: '#E7FF6A'}}

                                                />
                                                }
                                                </div>
                                            </div>
                                        ) : (
                                            <h4>Please select note.</h4>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Page>
    )
};
export default Notes;