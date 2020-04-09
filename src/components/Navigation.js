import React from 'react'
import {Link} from "react-router-dom";

const Navigation = (props) => {


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav " style={{width: '100%'}}>
                    <li className="nav-item pr-5"  style={{width: '50%'}}>
                        <Link to={"/" + props.subject + "/notes"} className="nav-link text-center">Notes <span
                            className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item px-5" style={{width: '50%'}}>
                        <Link to={"/" + props.subject + "/questions"} className="nav-link text-center">Ask a question</Link>

                    </li>
                    {/*// <!--                        <li class="nav-item">-->*/}
                    {/*// <!--                            <a class="nav-link disabled" href="#">Quiz</a>-->*/}
                    {/*// <!--                        </li>-->*/}
                </ul>
            </div>
        </nav>
    )
};
export default Navigation;