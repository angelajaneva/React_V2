import React from 'react'
import {Link} from "react-router-dom";

const Navigation = (props) => {
    return (
        <div className={`content-navigation ${props.hasOwnProperty("formOpen") ? '' : 'justify-content-end'}`}>
            {
                props.hasOwnProperty("formOpen") ? (
                    <button className={"btn btn-primary"}
                            onClick={props.formOpen}
                    >
                        <i className={"fa fa-plus"} aria-hidden="false"/> New Question
                    </button>
                ) : null
            }
            <div>
                <ul>
                    <li>
                        <Link to={"/" + props.classId + "/notes"}
                              className="nav-link text-center"
                        >
                            Notes <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/" + props.classId + "/questions"}
                              className="nav-link text-center"
                        >
                            Ask a question
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Navigation;