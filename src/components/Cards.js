import React from 'react'
import Card from "./Card";

import {useParams, useHistory} from "react-router-dom";

const Cards = (props) => {

    const {classId} = useParams();
    const history = useHistory();



    function getNotes() {
        const newRef = props.cards.filter(note => {
            return note.aclass.id === classId;
        });

        return newRef.map(note => {
            return (
                <Card key={note.id} title={note.title}
                      descr={note.description} id={note.id} onDelete={props.onDelete} classId={classId}/>
            )
        })
    }

    return (
        <div>
            <div className={"wrapper d-flex align-items-stretch"}>
                <div id="content" className="p-4 p-md-5 pt-5">
                    {/*<hr/>*/}
                    <div className="my-sm-n3">
                        <div className="mt-4">
                            <div className="ml-4 form-inline">
                                <button className="btn-light card" style={{width: '30%'}} onClick={() => {
                                    history.push("/note/new")
                                }}>
                                    Add new note
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