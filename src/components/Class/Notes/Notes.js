import React, {useState, useEffect} from 'react'
import Note from "./Note";
import Navigation from "../Navigation";
import Page from "../../Views/Page";
import {useParams, useHistory} from "react-router-dom";
import axios from "../../../custom-axios";

const Notes = (props) => {
    const {classId} = useParams();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        axios.get("http://localhost/_Projects/Freelancing/angrus/api/class.php?id=" + props.id).then(data => {
            setName(data.data)
        })
    });

    const openNote = (note = null, isEdit = false) => {
        if(note){
            setIsEdit(isEdit);
            setTitle(note.title);
            setDescription(note.description);
        }
    };

    return (
        <Page title={name} styles={"content"}>
            <Navigation />
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
                <div className={"note-list-read"}>
                    {
                        isEdit ? (
                            <div>

                            </div>
                        ) : (
                            <div>
                                <h3>{title}</h3>
                                <div>{description}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Page>
    )
};
export default Notes;