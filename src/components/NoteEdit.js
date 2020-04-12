import React, {useState, useEffect} from 'react'
import axios from '../custom-axios'
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";


const NoteEdit = (props) => {

    const history = useHistory();
    const [note, setNote] = useState({description: '', title: ''});
    const {noteId} = useParams();

    useEffect(() => {
        axios.get("/note/" + noteId).then((data) => {
            setNote(data.data)
        })
    }, [noteId]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const editedNote = {
            "id": noteId,
            "title": e.target.title.value,
            "description": e.target.description.value
        };
        props.onSubmit(editedNote);
        history.push("/" + props.id + "/notes");
    };


    const onChangeHandler = (e) => {
        const paramValue = e.target.value;
        setNote({...note, [e.target.name]: paramValue});
    };


    return (
        <div className=" p-4 p-md-5 pt-5">

            <div className="card card-warning">
                <div className="card-body">
                    <form onSubmit={onFormSubmit}>
                        <div className="">
                            {/*// <!-- text input -->*/}
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name={"title"} className="form-control" placeholder="Enter ..."
                                       value={note.title} onChange={onChangeHandler}/>
                            </div>
                        </div>
                        <div className="">
                            {/*// <!-- textarea -->*/}
                            <div className="form-group">
                                <label/>
                                <label>Description</label>
                                <textarea name={"description"} className="form-control" rows="10"
                                          value={note.description}
                                          onChange={onChangeHandler}/>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <button type="submit" className="btn btn-light">Submit</button>
                            <button type="submit" className="btn btn-light float-right">Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
};

export default NoteEdit