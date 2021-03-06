import React from 'react'
import Highlighter from "react-highlight-words";

const Note = (props) => {
    const deleteHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.onDelete(props.note.id);
    };

    const openHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.openNote(props.note);
    };

    const editHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.openNote(props.note, true);
    };

    return (
        <div className="note-side-holder" onClick={openHandler}>
            <h5>
                <Highlighter searchWords={[props.searchTerm]}
                             textToHighlight={props.note.title}
                             highlightStyle={{backgroundColor: '#E7FF6A'}}
                />
            </h5>
            <div>
                <button title="Edit"
                        onClick={editHandler}
                        className={"btn btn-link text-dark border rounded-0 mr-1"}
                >
                    <i className="ti-pencil-alt" aria-hidden="false"/>
                </button>
                <button title="Delete"
                        onClick={deleteHandler}
                        className={"btn btn-link text-dark border rounded-0 mr-1"}
                >
                    <i className="ti-trash" aria-hidden="false"/>
                </button>
            </div>
        </div>
    )
};

export default Note;