import React from 'react'
import {Link} from "react-router-dom";

const Navigation = (props) => {
    return (
        <div className="content-navigation">
            <div>
                <ul>
                    <li>
                        <Link to={"/" + props.subject + "/notes"}
                              className="nav-link text-center"
                        >
                            Notes <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/" + props.subject + "/questions"}
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