import React from 'react'
import {Link} from "react-router-dom";



const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <a className="navbar-brand" href="#">-</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                        aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                </button>

                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to={"/home"} className="nav-link">My Classes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link">Sign in</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;