import React, {useState, useEffect} from 'react'
import Note from "./Note";
import Navigation from "../Navigation";
import Page from "../../Views/Page";
import {useParams} from "react-router-dom";

const Notes = (props) => {
    const {classId} = useParams();
    const [name, setName] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        let getClass = props.classes.filter(item => item.id === props.id)[0];

        if(getClass){
            setName(getClass.name);
        }
    });

    const openNote = (note = null, isEdit = false, isNew = false) => {
        setIsEdit(isEdit);
        setIsNew(isNew);

        setTitle("");
        setDescription("");
        if(note){
            setTitle(note.title);
            setDescription(note.description);
        }
    };

    const saveNote = () => {
        let note = {
            "classId": classId,
            "title": title,
            "description": description
        };

        if(isNew){
            setTitle("");
            setDescription("");
            props.onNewTermAdded(note);
        }else {
            props.updateNote(note);
        }

        setIsEdit(false);
        setIsNew(false);
        props.loadNotes();
    };

    return (
        <Page title={name} styles={"content"}>
            <Navigation classId={classId} />
            <div className="notes-list">
                <div className={"notes-list-holder"}>
                    <input className="form-control search-control" placeholder={"Search"} />
                    {
                        props.cards.filter(note => {
                            return note.aclass.id === classId;
                        }).map(note => {
                            return (
                                <Note key={note.id}
                                      note={note}
                                      onDelete={props.onDelete}
                                      classId={classId}
                                      openNote={openNote}
                                />
                            )
                        })
                    }
                </div>
                <div className={"notes-list-read"}>
                    <div className={"notes-list-read-options"}>
                        <button className={"btn btn-primary"} onClick={() => openNote(null, true, true)}>
                            <i className={"fa fa-plus"} aria-hidden="false"></i> Add Note
                        </button>
                    </div>
                    <div className={"notes-list-read-body"}>
                        {
                            isEdit ? (
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
                            ) : (
                                <div>
                                    {
                                        title && description ? (
                                            <div>
                                                <h3>{title}</h3>
                                                <div>{description}</div>
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