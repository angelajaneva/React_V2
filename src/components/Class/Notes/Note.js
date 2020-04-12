import React from 'react'

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
            <h5>{props.note.title}</h5>
            <div>
                <button title="Уреди"
                        onClick={editHandler}
                        className={"btn btn-link text-dark border rounded-0 mr-1"}
                >
                    <i className="ti-pencil-alt" aria-hidden="false"></i>
                </button>
                <button title="Уреди"
                        onClick={deleteHandler}
                        className={"btn btn-link text-dark border rounded-0 mr-1"}
                >
                    <i className="ti-trash" aria-hidden="false"></i>
                </button>
            </div>
        </div>
    )
};

export default Note;