import React, {useState, useEffect} from 'react'
import Card from "./Card";
import {useParams, useHistory} from "react-router-dom";
import axios from '../custom-axios'

const Cards = (props) => {

    const [notes, setNotes] = useState([]);
    const {classId} = useParams();

    useEffect(() => {
        axios.get("/notes/" + classId).then(data => {
            setNotes(data.data)
        })
    }, []);


    function getNotes() {
        return notes.map(note => {
            return (
                <Card key={note.id} title={note.title}
                      descr={note.description} id={note.id} onDelete={props.onDelete} classId={classId}/>
            )
        })
    }


    const history = useHistory();


    return (
        <div>
            <div className={"wrapper d-flex align-items-stretch"}>
                <div id="content" className="p-4 p-md-5 pt-5">
                    {/*<hr/>*/}
                    <div className="my-sm-n3">
                        <div className="mt-4">
                            <div className="ml-4 form-inline">
                                <button className="btn-light card" style={{width: '30%'}} onClick={() => {
                                    history.push("/note/new")}}>
                                    <p className="text-center">Add new note</p>
                                </button>
                                {/*<input type="text" className="card  ml-xl-5" placeholder=" Search"*/}
                                {/*       style={{width: '30%', height:''}}/>*/}
                            </div>

                            {getNotes()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Cards;