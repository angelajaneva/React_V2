import React from 'react'
import {Link} from "react-router-dom";

const Card = (props) => {
    const deleteHandler = (e) => {
        e.preventDefault();
        props.onDelete(props.id);
    };

    return (
        <div className="">
            <div className="w-card-4 mt-4">
                <header className="w-container w-light-gray">
                    <h4 className="mt-3">{props.title}</h4>
                    <div className="mt-lg-n4 fa-pull-right pr-3">
                        <input type="file" className=""/>
                        {/*ti-clip pr-2*/}
                        <a href="#" className="ti-share pr-2" title="Сподели"/>
                        <Link to={"/" + props.classId + "/" + props.id + "/edit"} className="ti-pencil-alt pr-2" title="Уреди"/>
                        <a href="#" onClick={deleteHandler} className="ti-trash pr-2" title="Избриши"/>
                    </div>
                    <hr/>
                </header>

                <div className="w-container">
                    <p>{props.descr}</p>

                </div>
            </div>
        </div>
    )
};

export default Card;