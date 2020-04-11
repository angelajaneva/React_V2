import React from 'react'
import {Link} from "react-router-dom";

const Card = (props) => {
    const deleteHandler = (e) => {
        e.preventDefault();
        props.onDelete(props.note.id);
    };
    const openHandler = (e) => {
        e.preventDefault();
        props.openNote(props.note);
    };

    return (
        <div className="note-side-holder" onClick={openHandler}>
            <h5>{props.note.title}</h5>
            <div>
                <Link to={"/" + props.classId + "/" + props.note.id + "/edit"} className="ti-pencil-alt pr-2" title="Уреди"/>
                <a href="#" onClick={deleteHandler} className="ti-trash pr-2" title="Избриши"/>
            </div>
        </div>
    )
};

export default Card;